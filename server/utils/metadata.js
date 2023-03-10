const JSONBig = require('json-bigint');
const { MEDIA_URL } = require('./helper');

async function metaPhotoPost(data) {
    var file = data.files[0];

    if (file && (file.fileUuid || file.fileId)) {
        url = `${MEDIA_URL}/v3/media/getfile/${(file.fileUuid || file.fileId).toString()}?format=large`;
    } else {
        url = file.downloadUrl;
        if (url.indexOf('?') === -1) {
            url = `${url}?format=large`;
        }
    }

    return { image: url, title: data.title };
}

async function metaVideoPost(data) {
    var file = data.files[0];

    if (file && (file.fileUuid || file.fileId)) {
        url = `${MEDIA_URL}/v3/media/getfile/${(file.fileUuid || file.fileId).toString()}?format=thumbnail&stream=2`;
    } else {
        url = file.downloadUrl;
        if (url.indexOf('?') === -1) {
            url = `${url}?format=thumbnail&stream=2`;
        }
    }

    return { image: url, title: data.title };
}

async function linkPost(data) {
    if (data.imageUrl) {
        return {
            title: data.title,
            image: data.imageUrl
        };
    } else if (data.link) {
        try {
            const resp = await fetch(`https://store.safechat.com/api/getmeta?url=${encodeURIComponent(data.link)}`);
            const text = await resp.text();
            const obj = JSONBig.parse(text) || {};
            return {
                title: obj.title,
                image: obj.image
            };
        } catch { }
    }

    return {};
}

async function linkLS(data) {
    if (!data) return null;

    const imageURL = (data.files && data.files[0] && data.files[0].thumbnailUri) ?
        data.files[0].thumbnailUri : `${MEDIA_URL}/v3/media/getfile/25c9e312598445838869c75d7b828303?format=thumbnail`;

    return {
        title: data.title,
        image: imageURL
    };
}

async function makeMetadata(meta) {
    if (!meta || !meta[0]) return null;

    const { type, data } = meta[0];
    // console.log('###############', type, data);
    const fData = JSONBig.parse(data);
    if (type === 'photo') {
        return await metaPhotoPost(fData);
    }
    else if (type === 'video') {
        return await metaVideoPost(fData);
    } else if (type === 'link' || type === 'article_post' || type === 'youtube_post') {
        //Link Post
        return await linkPost(fData);
    } else if (type === 'live_stream') {
        return await linkLS(fData);
    }

    return null;
}

const escapeHTML = str => str.replace(/[&<>'"]/g,
    tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
    }[tag]));

function encodeMetaData(data, maxLength = 150) {
    if (!data)
        return '';

    let metaData = data.replace(/[\r\n]+/g, " ") // Remove multiple line breaks (both \r or \n)
        .replace(/:m\|(\d+)\|([^|]*)\|(\w+):/g, (all, e1, e2, e3) => {
            return `@${e2}`; // Replace mention code to mention
        }).replace(/:e\|(\d+)\|([\w-]+)\|(\d+):/g, (all, e1, e2, e3) => {
            return String.fromCodePoint(parseInt(e2, 16) || 0) // Replace emoji code to unicode
        }); 

    if (metaData.length > maxLength) {
        var nearestSpace = metaData.indexOf(" ", maxLength);
        metaData = metaData.substr(0, (nearestSpace > 0 && nearestSpace < 198) ? nearestSpace : maxLength) + "...";
    }

    return escapeHTML(metaData);
}

module.exports.createPostMetaTags = async function (metadata, currentUrl) {
    if (!metadata) return '';
    const { text, meta, channelName } = metadata;
    const _meta = { title: '', desc: text, img: '', type: 'website', url: currentUrl };

    if (meta && meta.length > 0) {
        const data = await makeMetadata(meta);
        if (data) {
            _meta.img = data.image || '';
            _meta.title = data.title
        }
    }

    if (!_meta.title && meta) _meta.title = meta.title || meta.caption;
    if (!_meta.title && channelName) _meta.title = channelName;
    if (!_meta.title && metadata.userName) _meta.title = `@${metadata.userName}`;

    return this.createMetaTags(_meta);
}

module.exports.createMetaTags = async function (metadata) {
    if (!metadata) return '';

    var { title, desc, img, type, url } = metadata;
    title = encodeMetaData(title);
    desc = encodeMetaData(desc);

    return {
        title,
        tags: `<meta name="title" content="${title}" />
            <meta name="description" content="${desc}" />
            <meta property="description" content="${desc}" />
            <meta property="og:site_name" content="SafeChat.com" />
            <meta property="og:type" content="${type || 'website'}" />
            <meta property="og:title" content="${title}" />
            <meta property="og:url" content="${url}" />
            <meta property="og:image" content="${img}" />
            <meta property="og:description" content="${desc}" />
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:site" content="SafeChat.com" />
            <meta name="twitter:title" content="${title}" />
            <meta name="twitter:description" content="${desc}" />
            <meta name="twitter:image" content="${img}" />`
    };
}
