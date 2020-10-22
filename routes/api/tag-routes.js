const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({
    include:[Product]
  })
  .then(tagData=>{
    res.json(tagData);
  })
  .catch(err=>{
    res.status(500).json(err);
  })
  // be sure to include its associated Product data
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findOne({
    where:{
      id: req.params.id
    },
    // be sure to include its associated Products
    include:[
      Product
    ]
  })
    .then(tagData => {
      if (!tagData) {
        res.status(404).json({ message: 'No tag found with this id' });
        return;
      }
      res.json(tagData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body
  )
  .then(tagConfirm=>res.json(tagConfirm))
  .catch(err=>{
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body,
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
  .then(tagData=>{
    res.json(tagData);
  })//same as line 49
  .catch(err=>{
    console.log (err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where:{
      id:req.params.id
    }
  })
  .then(tagConfirm=>{
    res.json(tagConfirm);
  })
  .catch(err=>{
    console.log (err);
    res.status(500).json(err);
  })
});

module.exports = router;
