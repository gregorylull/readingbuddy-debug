import { selectAllImages, useGetImagesQuery } from '@/app/apiSlice';
import { useAppSelector } from '@/app/store';
import { config } from '@/configs/config';

interface LatestImagesProps {}

export function LatestImages({}: LatestImagesProps) {

        const images = useAppSelector(state => selectAllImages(state))

        const imageListItems = images.map(({id,url}) => {
        const formattedUrl = `${config.imageUrl}/${url}`

        return (
            <li key={id}>
                <img src={formattedUrl} />
            </li>
        );

        })


    return (
        <>
            <ul>{imageListItems}</ul>
        </>
    );
}
