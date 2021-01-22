import crypto from "crypto"

export default (input: string): string => {
    return crypto.createHash("md5").update(input).digest("hex")
}
