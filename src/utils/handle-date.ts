const handleDate = (data: string, options: Intl.DateTimeFormatOptions) => {
    const date = new Date(data + '')?.toLocaleDateString('en-US', options)
    return date
}

export default handleDate;