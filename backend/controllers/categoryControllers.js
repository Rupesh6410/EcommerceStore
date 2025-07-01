import Category from "../models/categoryModals.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const createCategory = asyncHandler(async (req, res) => {
   try {
    const {name}= req.body;
    if(!name){
      return res.json({error: "Name is required"}) 
    }

    const existingCategory= await Category.findOne({name})

    if (existingCategory) {
      return res.json({error: "Category already exists"}) 
    }
    const category = await new Category({name}).save();

    res.json(category)

    
    
    
   } catch (error) {
    console.log(error)
    return res.status(400).json(error)
    
   }
});

const updateCategory = asyncHandler(async (req, res) => {
   try {
      const {name}= req.body;
      const {categoryId}= req.params;

      const category = await Category.findOne({_id:categoryId})

      if (!category) {
         return res.json({error: "Category not found"})
      }

      category.name = name
      await category.save()
      res.json(category)
      
   } catch (error) {
      console.error(error)
      res.status(500).json({error: "Server Error"})
      
   }
});

const deleteCategory = asyncHandler(async (req, res) => {
   try {
      const {categoryId}= req.params;

      const removed = await Category.findOneAndDelete({_id:categoryId})
      res.json(removed)

      
   } catch (error) {
      console.error(error)
      res.status(500).json({error: "Server Error"})
      
   }
});

const listCategories= asyncHandler(async (req, res) => {
   try {
      const all = await Category.find({})
      res.json(all)
      
   } catch (error) {
      console.error(error)
      res.status(400).json({error: "Server Error"})
      
   }
});

const readCategory= asyncHandler(async (req, res) => {
try {

   const category = await Category.findOne({_id: req.params.id})
   res.json(category)
   
} catch (error) {
   console.error(error)
      res.status(400).json({error: "Server Error"})
   
}
});


export { createCategory , updateCategory , deleteCategory , listCategories , readCategory};