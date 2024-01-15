export default function Image({ src, ...rest }) {
    const baseUrl = import.meta.env.VITE_API_BASE_URL_IMAGES;
    src = src && src.includes('https://')
    ? src 
    : `${baseUrl}/uploads/${src}`
    return (
        <img{...rest} src={src} alt={''} />
    )
}
