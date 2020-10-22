const router = require('express').Router();
const { Category, Product, Tag, ProductTag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
    // be sure to include its associated Products
    include:[Product]
  })
  .then(categoryData => {
    //const {dataValues}=categoryData;
    // const data=JSON.stringify(categoryData)
    // console.table(data);
    res.json(categoryData);
  })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
  
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findOne({
    where:{
      id: req.params.id
    },
    // be sure to include its associated Products
    include:[
      Product
    ]
  })
    .then(categoryData => {
      if (!categoryData) {
        res.status(404).json({ message: 'No category found with this id' });
        return;
      }
      res.json(categoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name:req.body.category_name
  })
  .then(categoryConfirm=>res.json(categoryConfirm))
  .catch(err=>{
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body,
    {
      where:{
        id:req.params.id
      }
    },
    {
      include:[
        Product
      ]
    }
  )
  .then(categoryData=>{
    res.json(categoryData);
  })//same as line 49
  .catch(err=>{
    console.log (err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where:{
      id:req.params.id
    }
  })
  .then(categoryConfirm=>{
    res.json(categoryConfirm);
  })
  .catch(err=>{
    console.log (err);
    res.status(500).json(err);
  })
});

module.exports = router;
