const router = require("express").Router();
const cloudinary = require("../utils/cloudinary");
const upload =  require("../utils/multer");
const User = require("../model/user");

//上傳
router.post("/", upload.single("image"), async(req, res) => {
    try {
        const result = await cloudinary.upload.upload(req.file.path)
        let user = new User({
            name: req.body.name,
            avatar: result.secure_url,
            cloudinary_id: result.public_id,
        });
        await user.save();
        res.json(user);
    }
    catch(err){
        console.log(err);
    }
});

// 紀錄
router.get("/", async(req, res) => {
    try{
        let user = await User.find();
        res.json(user);
    }
    catch(err){
        console.log(err);
    }
});

//刪除
router.delete("/:id", async(req,res) => {
    try{
        let user = await User.findById(req.params.id);
        if(!user){
            return res.status(404).json({success: false, message: "User not found"});
        }//如果沒有找到回傳狀態404和User not found
        await cloudinary.uploader.destroy(user.cloudinary_id);
        await user.deleteOne(); //刪除紀錄
        res.json(user); // 回傳
    }
    catch(err){
        console.log(err);
    }
})

//新增特定一筆
router.put("/:id", upload.single("image"), async(req, res) => {
    try{
        let user = await User.findById(req.params.id);
        if(!user){
            return res.status(404).json({success: false, message: "User not found"});
        }//如果沒有找到回傳狀態404和User not found
        await cloudinary.uploader.destroy(user.cloudinary_id);
        let result;
        if(req.file){
            result = await cloudinary.uploader.upload(req.file.path);
        }
        const data = {
            name: req.body.name || user.name,
            avatar: result?.secure_url || user.avater,
            cloudinary_id: result?.public_id || user.cloudinary_id,
        };
        user = await User.findByIdAndUpdate(req.params.id, data, {new: true});
        res.json(user);
    }
    catch(err){
        console.log(err);
    }
});

// 查詢
router.get("/:id", async(req, res) => {
    try{
        let user = await User.findById(req.params.id);
        if(!user){
            return res.status(404).json({success: false, message: "User not found"});
        }
        res.json(user);
    }
    catch(err){
        console.log(err);
    }
})

//讓其他程式的可以尋找的到
module.exports = router;