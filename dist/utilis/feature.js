import mongoose from "mongoose";
export const connected = () => {
    mongoose.connect("mongodb://localhost:27017", {
        dbName: "EcommerceBackened"
    }).then((c) => {
        console.log(`Db connnected to ${c.connection.host}`);
    }).catch((e) => {
        console.log(e);
    });
};
