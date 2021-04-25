import s from './Dialog.module.css';
import cs from 'classnames';
import DialogMessageContainer from './DialogMessage/DialogMessageContainer';
import userPhoto from '../../assets/images/user.png';
import spinner from '../../assets/images/spinner.gif';
import Spinner from '../common/Spinner/Spinner';


const Dialog = ({messages, myId, tempPic, isTempPic, isTempMessage, isFetchingLoadMessage, isFetchingMessages, loadFunction, pagesNumber, submitForm, loadPhoto, formRef, wrapper, speakerImg, text, setText, currentPage}) => {

    return(
        <div>
            <div className={cs([s.dialog__wrapper], 'border', 'border-1')}>
                <div ref={wrapper} className={cs([s.dialog__messeges], 'scrollbar')}>
                    <div className={cs([s.dialog__filled])}>
                        {isFetchingMessages
                        ?
                            <div className={s.dialog__preloader}><Spinner /></div>
                        :
                        messages.length>0
                            ?
                            messages.map((item, i)=>{
                                if(i!=0){
                                    return <DialogMessageContainer key={item._id}
                                                    message={item}
                                                    myId={myId}
                                        />
                                }else{
                                    return <DialogMessageContainer key={item._id}
                                                        message={item}
                                                        myId={myId}
                                                        isTempMessage={isTempMessage}
                                            />;
                                }
                            })
                            :
                            <div className={s.dialog__noMessages}>У Вас поки немає повідолмень</div>
                        }
                        {currentPage<pagesNumber && <button  onClick={loadFunction} className={cs([s.dialog__loadMore], 'btn', 'btn-danger', 'myBtn')}>{isFetchingLoadMessage ? <img src={spinner} className={s.dialog__spinnerBtn} alt='spinner'/>: 'Загрузити ще'}</button>}
                    </div>
                </div>
                <div className={cs([s.dialog__photo], 'border', 'border-1')}><img alt="speaker" src={speakerImg ? speakerImg : userPhoto}/></div>
                <form ref={formRef} className={cs([s.dialog__panel])} action="#">
                    <textarea value={text} onChange={(e)=>{setText(e.target.value)}} autoFocus={true} className={cs([s.dialog__textarea], 'border', 'border-1')} placeholder="Напишіть Ваше повідомлення..."/>
                    <div className={s.dialog__file}>
                        <input accept="image/*" type="file" className={s.dialog__postBtn} id="file" onChange={loadPhoto}/>
                        <label htmlFor="file" className={'border'}>
                            <i className="bi bi-camera-fill"></i>
                            {isTempPic
                                ?
                                <div className={s.dialog_tempPic}>
                                    <img alt="tempPic" src={tempPic ? tempPic : ''}/>
                                </div>
                                :
                                null
                            }
                        </label>
                    </div>
                    <button onClick={submitForm} type="submit" className='border border-1'><i className="bi bi-envelope-fill"></i></button>
                </form>
            </div>
        </div>
    )
};


export default Dialog;

