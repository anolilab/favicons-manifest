import through2 from "through2"
import jimp from "jimp"
import clone from "clone"
import mergeDefaults from "lodash.defaultsdeep"
import path from "path"
import File from "vinyl"

const supportedMimeTypes = [jimp.MIME_PNG, jimp.MIME_JPEG, jimp.MIME_BMP]

const favicons = () => {}

export default favicons
