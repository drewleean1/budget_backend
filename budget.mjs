import mongoose from 'mongoose'; 
import 'dotenv/config';

mongoose.connect(
    process.env.MONGODB_CONNECT_STRING, 
    {useNewUrlParser:true}
);

const database = mongoose.connection; 

database.once("open", (err) => {
    if(err){
        res.status(500).json({ error: '500:Connection to the server failed.' });
    } else  {
        console.log('Successfully connected to MongoDB Budget collection using Mongoose.');
    }
});

const budgetSchema = mongoose.Schema({
    name:       {type: String, required: true},
    categories: {type: Array, required: true},
    allocation: {type: Number, required: true}
});

const Budget = mongoose.model('Budget', budgetSchema); 

const createBudget = async (name, categories, allocation) => {
    const budget = new Budget({
        name: name,   
        categories: categories,
        allocation: allocation
    });
    return budget.save();
}

const retrieveBudget = async () => {
    const query = Budget.find();
    return query.exec();
}

const retrieveBudgetById = async (_id) => {
    const query = Budget.findById({_id: _id}); 
    return query.exec();
}

const deleteBudgetById = async (_id) => {
    const result = await Budget.deleteOne({_id: _id}); 
    return result.deletedCount;
}

const updateBudget = async(_id, name, categories, allocation) => {
    const result = await Budget.replaceOne({_id: _id}, {
        name: name,   
        categories: categories,
        allocation: allocation
    });
    return {
        _id: _id,
        name: name,   
        categories: categories,
        allocation: allocation
    }
}


export {createBudget, retrieveBudget, retrieveBudgetById, deleteBudgetById, updateBudget}