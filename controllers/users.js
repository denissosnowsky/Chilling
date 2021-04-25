import User from "../models/User.js";


export const users = async (req, res) => {
    try{

        const previousUsers = (+req.query.pageNumber-1)*req.query.pageSize;
        const nextUsers = +req.query.pageNumber*req.query.pageSize;
        const searchedPhrase = req.body.search;
        let filteredArray;

        const quantity = await User.find();
        
        if(searchedPhrase){
            filteredArray = quantity.filter(item=> item.name.toLowerCase().indexOf(searchedPhrase.toLowerCase())!=-1 || item.surname.toLowerCase().indexOf(searchedPhrase.toLowerCase())!=-1).reverse();
        } else {
            filteredArray = quantity.reverse();
        }

        const totalUsersCount = filteredArray.length;
        
        const usersData = filteredArray.filter((user, i) => i>=previousUsers && i < nextUsers);

        const myFriends = await User.findOne({_id: req.user.userId}, 'friends');
        const usersArray = usersData.map((user)=>{
            if(myFriends.friends.indexOf(user._id)!=-1){
                return Object.assign({user}, {isFriend: true});
            } else if(user._id == req.user.userId) {
                return Object.assign({user}, {isMe: true});
            } else {
                return Object.assign({user}, {isFriend: false});
            }
        });
        res.status(200).json({usersArray, totalUsersCount});

    } catch(e){
        res.status(500).json({message: 'Щось пішло не так, спробуйте ще раз', resultCode: 0});
    }
};
