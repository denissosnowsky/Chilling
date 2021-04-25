import Music from "../models/Music.js";
import User from "../models/User.js";



export const friends = async (req, res) => {
    try{

        const previousUsers = (+req.query.pageNumber-1)*req.query.pageSize;
        const nextUsers = +req.query.pageNumber*req.query.pageSize;
        const searchedPhrase = req.body.search;
        let filteredArray;

        const friendsData = await User.findOne({_id: req.user.userId}).populate('friends').select('friends');

        if(searchedPhrase){
            filteredArray = friendsData.friends.filter(item=> item.name.toLowerCase().indexOf(searchedPhrase.toLowerCase())!=-1 || item.surname.toLowerCase().indexOf(searchedPhrase.toLowerCase())!=-1).reverse();
        } else {
            filteredArray = friendsData.friends.reverse();
        }

        const totalFriendsCount = filteredArray.length;
        const allFriends = friendsData.friends.length;
        const friendsArray = filteredArray.filter((friend, i) => i>=previousUsers && i < nextUsers);
        const friendsResponse =  friendsArray.map(friend => {
            return Object.assign({friend}, {isFriend: true});
        });

        res.status(200).json({friendsResponse, totalFriendsCount, allFriends});
    } catch(e){
        res.status(500).json({message: 'Щось пішло не так, спробуйте ще раз', resultCode: 0});
    }
};


export const addFriend = async (req, res) => {
    
    try{
        const friend = await User.findOneAndUpdate({_id: req.user.userId}, {$push: {friends: req.body.id,},});
        return res.json('Новий друг добавлений');

    } catch(e){
        res.status(500).json({"e.message":e.message , message: 'Щось пішло не так, спробуйте ще раз', resultCode: 0});
    }
};

export const removeFriend = async (req, res) => {
    try{
        const friend = await User.findOneAndUpdate({_id: req.user.userId}, {$pull: {friends: req.body.id,},});
        return res.json('Друг видалений');

    } catch(e){
        res.status(500).json({message: 'Щось пішло не так, спробуйте ще раз', resultCode: 0});
    }
};