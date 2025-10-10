

export function getInitials(fullname: string, length = 2) {

    if (!fullname) return '';

    const initials = fullname.split(' ')
    .map((partialname) => partialname.charAt(0).toUpperCase())
    .join('')
    .substring(0, length);

    return initials;

}
