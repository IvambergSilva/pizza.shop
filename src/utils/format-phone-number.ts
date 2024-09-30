export function formatPhoneNumber(phone: string) {
    const cleanPhone = phone.replace(/\D/g, '')

    if (cleanPhone.length === 11) {
        return `(${cleanPhone.slice(0, 2)}) ${cleanPhone[2]} ${cleanPhone.slice(3, 7)}-${cleanPhone.slice(7)}`
    } else if (cleanPhone.length === 10) {
        return `(${cleanPhone.slice(0, 2)}) ${cleanPhone.slice(2, 6)}-${cleanPhone.slice(6)}`
    } else if (cleanPhone.length === 8) {
        return `${cleanPhone.slice(0, 4)}-${cleanPhone.slice(4)}`
    }
    
    return phone
}
