import { MouseEventHandler } from "react";

type BoxProps = {
    id: string,
    cover: string,
    title: string,
    handleDownloadClick: MouseEventHandler,
}

const Box = (props: BoxProps) => {
    return (
        <div className='video-box'>
            <img src={props.cover} alt={props.title} />
            <h2>{props.title}</h2>
            <button className="video-box-button" id={props.id} onClick={props.handleDownloadClick}>Download</button>
        </div>
    )
}

export default Box;