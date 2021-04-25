import { v4 as uuidv4 } from 'uuid';
import Message from "../models/Message.js";
import Dialog from '../models/Dialog.js';


export const getMessageMenu = async (req, res) => {
    try{
        const from = req.user.userId;
        const portion = req.query.portion;
        const currentPage = req.query.currentPage;

        let dialogs = await Dialog.find({$or : [{speakerOne: from}, {speakerTwo: from}]}).populate('messages').populate('speakerOne').populate('speakerTwo');
        const count = await Dialog.find({$or : [{speakerOne: from}, {speakerTwo: from}]}).count();

        dialogs.sort(function (a, b) {
            let aDate;
            let bDate;
            if(a.messages.length>0){
                aDate = a.messages[a.messages.length-1].date;
            }else{
                aDate = a.date;
            };

            if(b.messages.length>0){
                bDate = b.messages[b.messages.length-1].date;
            }else{
                bDate = b.date;
            };
            
            if (aDate > bDate){
              return -1;
            }
            if (aDate < bDate){
              return 1;
            }
            return 0;
        });

        dialogs = dialogs.slice(0, portion*currentPage);        
        res.json({dialogs, count});
    }
    catch(e){
        res.status(500).json({message: 'Щось пішло не так, спробуйте ще раз', resultCode: 0});
    }
}; 


export const getMessages = async (req, res) => {

    try{
        const me = req.user.userId;
        const dial_id = req.params.id;
        const portion = req.query.portion;
        const currentPage = req.query.currentPage;

        const dialog = await Dialog.findById(dial_id).populate({path: 'messages', populate: {path: 'from'}}).populate({path: 'messages', populate: {path: 'to'}}).populate('speakerOne').populate('speakerTwo');
        const foundId = dialog._id;

        let allMessages = dialog.messages;
        const count = dialog.messages.length;
        allMessages.sort(function (a, b) {
            if (a.date > b.date){
              return -1;
            }
            if (a.date < b.date){
              return 1;
            }
            return 0;
        });

        allMessages = allMessages.slice(0, portion*currentPage);

        if(dialog.speakerOne._id == me || dialog.speakerTwo._id == me){
            res.json({allMessages, foundId, count, speakers: [{id: dialog.speakerOne._id, img: dialog.speakerOne.sImg}, {id: dialog.speakerTwo._id, img: dialog.speakerTwo.sImg}]});
        } else {
            return res.status(500).json({message: 'Це приватний діалог', resultCode: 0});
        }
    }
    catch(e){
        res.status(500).json({message: 'Щось пішло не так, спробуйте ще раз', resultCode: 0});
    }
};


export const addMessage = async (req, res) => {
    
    try{
        const from = req.user.userId;
        const {text, to} = req.body;
        let img;

        if(req.files){
            img = req.files.img;
            const imageName = uuidv4() + '.jpg';
            img.mv(req.filePath+'/'+imageName);
            img = imageName;
        }else{
            img = '';
        }

        if(img || text){
            const post = new Message({text, img, from, to});
            await post.save();
            
            const dialogOne = await Dialog.findOne({speakerOne: from, speakerTwo: to});
            const dialogTwo = await Dialog.findOne({speakerOne: to, speakerTwo: from});

            if(!(dialogOne || dialogTwo)){
                const dialog = new Dialog({speakerOne: from, speakerTwo: to, messages: post._id});
                await dialog.save();
            }else if(dialogOne){
                const msg = await Dialog.findOneAndUpdate({_id: dialogOne._id}, {$push: {messages: post._id,},});
            } else{
                const msg = await Dialog.findOneAndUpdate({_id: dialogTwo._id}, {$push: {messages: post._id,},});
            }

            res.status(201).json({ message: 'Повідомлення відправлено', resultCode: 1});
        } else{
            res.status(500).json({message: 'Не можна відправляти пусте повідолмення', resultCode: 0});    
        }

    }
    catch(e){
        res.status(500).json({message: 'Щось пішло не так, спробуйте ще раз', resultCode: 0});
    }
};

export const createDialog = async (req, res) => {

    try{
        const {to} = req.body;       
        const me = req.user.userId;
        let dialog_id;

        const dialogOne = await Dialog.findOne({speakerOne: me, speakerTwo: to});
        const dialogTwo = await Dialog.findOne({speakerOne: to, speakerTwo: me});

        if(!(dialogOne || dialogTwo)){
            const dialog = new Dialog({speakerOne: me, speakerTwo: to});
            await dialog.save();
            dialog_id = dialog._id;
        }else if(dialogOne){
            dialog_id = dialogOne._id;
        } else{
            dialog_id = dialogTwo._id;
        }
        res.json(dialog_id);

    } catch (e) {
        res.status(500).json({ message: 'Щось пішло не так, спробуйте ще раз', resultCode: 0 });
    }
};