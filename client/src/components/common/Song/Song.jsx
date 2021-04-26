import s from './Song.module.css';
import spinner from '../../../assets/images/spinner.gif';
//import { url } from '../../../config';

const Song = ({music, addMusic, deleteMusic, searchedPhrase, portion, currentPage, isFetchingAddSong}) => {

    let fullName = `${music.song.author} - ${music.song.name}`;
    if(fullName.length>42){
        fullName = fullName.slice(0, 40) + '...';
    }

    return (
        <div className={s.song__wrapper}>
            <audio controls>
                <source src={music.song.songSrc} type="audio/mpeg"/>
            </audio>
            <span className={s.song__name}>{fullName}</span>
            {music.isAdded
                ?
                <span onClick={()=>{deleteMusic(music.song._id, searchedPhrase, portion, currentPage)}} className={s.song__btn}>
                    {isFetchingAddSong.some(id=>id==music.song._id)
                        ? 
                        <img src={spinner} alt='spinner' className={s.song__spinnerImg}/>
                        :
                        <i className="bi bi-patch-minus"></i>
                    }
                </span>
                :
                <span onClick={()=>{addMusic(music.song._id, searchedPhrase, portion, currentPage)}} className={s.song__btn}>
                    {isFetchingAddSong.some(id=>id==music.song._id)
                        ? 
                        <img src={spinner} alt='spinner' className={s.song__spinnerImg}/>
                        :
                        <i className="bi bi-patch-plus"></i>
                    }
                </span>
            }
        </div>
    )
};

export default Song;