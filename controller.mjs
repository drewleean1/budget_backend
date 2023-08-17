import 'dotenv/config';
import express from 'express';
import * as expenses from './model.mjs';
import * as budget from './budget.mjs';

const PORT = process.env.PORT;
const app = express();
app.use(express.json());

// EXPENSES CONTROLLER 
app.post ('/expenses', (req, res) => {
    expenses.createExpense(
        req.body.date, 
        req.body.item, 
        req.body.amount, 
        req.body.category, 
        req.body.method
        )
        .then(expense => {
            res.status(201).json(expense);
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({ error: 'We were unable to log this expense' });
        });
});

app.get('/expenses', (req, res) => {
    expenses.retrieveExpense()
        .then(expense => {
            if (expense !== null) {
                res.json(expense);
            } 
            else {
                res.status(404).json({Error: 'Sorry. We were unable to find your expenses.'});
            }
        })
        .catch(error => {
            console.log(error); 
            res.status(400).json({Error: 'We failed to retrieve your expenses.'});
        });

});

app.get('/expenses/:_id', (req, res) => {
    expenses.retrieveExpenseById(req.params._id)
        .then(expense => {
            if (expense !== null) {
                res.json(expense);
            } 
            else {
                res.status(404).json({Error: 'Sorry. We were unable to find your expenses.'});
            }
        })
        .catch(error => {
            console.log(error); 
            res.status(400).json({Error: 'We failed to retrieve your expenses.'});
        });

});


app.get('/expenses/category/:givenCategory', (req, res) => {
    expenses.retrieveExpenseByCategory(req.params.givenCategory)
        .then(expense => {
            if (expense !== null) {
                res.json(expense);
            } 
            else {
                res.status(404).json({Error: 'Sorry. We were unable to find your expenses.'});
            }
        })
        .catch(error => {
            console.log(error); 
            res.status(400).json({Error: 'We failed to retrieve your expenses.'});
        });
        
    });

app.get('/expenses/category/:givenCategory/month/:Month/year/:Year', (req, res) => {
    expenses.retrieveExpenseByCategoryMY(req.params.givenCategory, req.params.Month, req.params.Year)
        .then(expense => {
            if (expense !== null) {
                res.json(expense);
            } 
            else {
                res.status(404).json({Error: 'Sorry. We were unable to find your expenses.'});
            }
        })
        .catch(error => {
            console.log(error); 
            res.status(400).json({Error: 'We failed to retrieve your expenses.'});
        });
        
    });


app.get('/expenses/sDate/:startDate/eDate/:endDate', (req, res) => {
    expenses.retrieveExpenseByDateRange(req.params.startDate, req.params.endDate)
        .then(expense => {
            if (expense !== null) {
                res.json(expense);
            } 
            else {
                res.status(404).json({Error: 'Sorry. We were unable to find your expenses.'});
            }
        })
        .catch(error => {
            console.log(error); 
            res.status(400).json({Error: 'We failed to retrieve your expenses.'});
        });
});

app.get('/expenses/month/:Month/year/:Year', (req, res) => {
    expenses.retrieveExpenseByMonthYear(req.params.Month, req.params.Year)
        .then(expense => {
            if (expense !== null) {
                res.json(expense);
            } 
            else {
                res.status(404).json({Error: 'Sorry. We were unable to find your expenses.'});
            }
        })
        .catch(error => {
            console.log(error); 
            res.status(400).json({Error: 'We failed to retrieve your expenses.'});
        });
        

});

app.put('/expenses/:_id', (req, res) => {
    expenses.updateExpense(
        req.params._id, 
        req.body.date, 
        req.body.item, 
        req.body.amount, 
        req.body.category, 
        req.body.method
        )
        .then(expense => {
            res.status(201).json(expense);
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({ error: 'We were unable to log this expense' });
        });
});

app.delete('/expenses/:_id', (req, res) => {
    expenses.deleteExpenseById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send();
            }
            else {
                res.status(404).json({Error: 'This expense does not exist.'})
            }
        })
        .catch(error => {
            console.error(error); 
            res.send({error:'We failed to delete your expense'});
        });
});

// BUDGET CONTROLLER
app.post ('/budget', (req, res) => {
    budget.createBudget(
        req.body.name, 
        req.body.categories, 
        req.body.allocation, 
        )
        .then(budgets => {
            res.status(201).json(budgets);
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({ error: 'We were unable to save this budget category' });
        });
});

app.get('/budget', (req, res) => {
    budget.retrieveBudget()
        .then(budgets => {
            if (budgets !== null) {
                res.json(budgets);
            } 
            else {
                res.status(404).json({Error: 'Sorry. We were unable to find this budget category.'});
            }
        })
        .catch(error => {
            console.log(error); 
            res.status(400).json({Error: 'We failed to retrieve this budget category.'});
        });
});

app.get('/budget/:_id', (req, res) => {
    budget.retrieveBudgetById(req.params._id)
        .then(budgets => {
            if (budgets !== null) {
                res.json(budgets);
            } 
            else {
                res.status(404).json({Error: 'Sorry. We were unable to find this budget category.'});
            }
        })
        .catch(error => {
            console.log(error); 
            res.status(400).json({Error: 'We failed to retrieve this budget category.'});
        });

});

app.put('/budget/:_id', (req, res) => {
    budget.updateBudget(
        req.params._id, 
        req.body.name, 
        req.body.categories, 
        req.body.allocation, 
        )
        .then(budgets => {
            res.status(201).json(budgets);
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({ error: 'We were unable to update this budget category' });
        });
});

app.delete('/budget/:_id', (req, res) => {
    budget.deleteBudgetById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send();
            }
            else {
                res.status(404).json({Error: 'This budget category does not exist.'})
            }
        })
        .catch(error => {
            console.error(error); 
            res.send({error:'We failed to delete this budget category'});
        });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});