import capitalize from "./capitalize";

const formatSelectLabel = (name: string) => {
    let result;
    if (name === 'dob') {
        result = 'Date of Birth'
        return result
    }
    if (name === 'ein') {
        result = 'Ein'
        return result
    }
    if (name ===  'usRegisted') {
        result = 'US Registered'
        return result
    }
    if (name === 'businessAddress') {
        result = 'Business Address'
        return result
    }
    if (name === 'addressProof') {
        result = 'Address Proof'
        return result
    }
    if (name === 'documentId') {
        result = 'Document ID'
        return result
    }
    if (name === 'isIncorporated') {
        result = 'Is Incorporated'
        return result
    }
    const label = name.split('_')
    if (label.length > 1) {
        const capname = capitalize(label[0])
        result = `${capname} ${label[1]}`
        return result

    }
    result = capitalize(label[0])
    return result
}

export default formatSelectLabel