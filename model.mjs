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
        console.log('Successfully connected to MongoDB Expenses collection using Mongoose.');
    }
});

const expenseSchema = mongoose.Schema({
    date:       {type: Date, required: true, default: Date.now},
    item:       {type: String, required: true},
    amount:     {type: Number, required: true, default: 0}, 
    category:   {type: String, required: true},
    method:     {type: String, required: true}
});

const Expense = mongoose.model('Expense', expenseSchema); 

const createExpense = async (date, item, amount, category, method) => {
    const expense = new Expense({
        date: date, 
        item: item, 
        amount: amount, 
        category: category, 
        method: method, 
    });
    return expense.save();
}

const retrieveExpense = async () => {
    const query = Expense.find();
    return query.exec();
}

const retrieveExpenseById = async (_id) => {
    const query = Expense.findById({_id: _id}); 
    return query.exec();
}

const retrieveExpenseByCategory = async(category) => {
    let cat = String(category);
    const query = Expense.find({category: cat});
    return query.exec();
}

const retrieveExpenseByCategoryMY = async(category, month, year) => {
    let cat = String(category);
    const query = Expense.find({$and: [{category:cat}, {$expr: {$and: [{"$eq": [{ "$month": "$date"}, month]},{"$eq": [{"$year": "$date"},year]}]}}]});
    return query.exec();
}

const retrieveExpenseByDateRange = async(startDate, endDate) => {
    let stringStartDate = String(startDate); 
    let stringEndDate = String(endDate)
    const query = Expense.find({ date: { $gte: new Date(stringStartDate), $lte: new Date(stringEndDate) } } )
    return query.exec();
}

const retrieveExpenseByMonthYear = async(month, year) => {
    const query = Expense.find()
    return query.exec(); {$expr: {$and: [{"$eq": [{ "$month": "$date"},month]},{"$eq": [{"$year": "$date"},year]}]}}
}

const retrieveExpenseByYear = async(month, year) => {
    const query = Expense.find()
    return query.exec(); {$expr: {$and: [{"$eq": [{"$year": "$date"},year]}]}}
}

const deleteExpenseById = async (_id) => {
    const result = await Expense.deleteOne({_id: _id}); 
    return result.deletedCount;
}

const updateExpense = async(_id, date, item, amount, category, method) => {
    const result = await Expense.replaceOne({_id: _id}, {
        date: date, 
        item: item, 
        amount: amount, 
        category: category, 
        method: method, 
    });
    return {
        _id: _id,
        date: date, 
        item: item, 
        amount: amount, 
        category: category, 
        method: method, 
    }
}


export {createExpense, retrieveExpense, retrieveExpenseById, retrieveExpenseByCategory, retrieveExpenseByCategoryMY, retrieveExpenseByDateRange, retrieveExpenseByMonthYear, retrieveExpenseByYear, deleteExpenseById, updateExpense}