const connection = require('../db-config');
const router = require('express').Router();

router.get('/', (req, res) =>{
    connection.query('SELECT * FROM motos', (err, result) => {
        if(err){
            res.status(500).send('error retrieving motos from database');
        } else {
            res.json(result);
        }
    })
} );

router.get('/:id', (req, res) =>{
    const motosId = req.params.id;
    connection.query(
        'SELECT * FROM motos WHERE id = ?',
        [motosId], 
        (err, results) =>{
            if(err){
                res.status(500).send('Error retrieving moto from database')
            } else{
                if(results.length) res.json(results[0])
                else res.status(404).send('moto not found');
            }
        }
    )
});

router.post('/', (req, res) => {
    const {marque, modele, prix} = req.body;
    connection.query(
        'INSERT INTO motos (marque, modele, prix) VALUE (?, ?, ?)',
        [marque, modele, prix],
        (err, result) => {
            if(err){
                res.status(500).send('Error saving the moto')
             } else {
                 const id= result.insertId;
                 const createdgod = {id, marque, modele, prix};
                 res.status(201).json(createdgod);
            }
        })
 });

//  router.put('/:id', (req, res) => {
//     const motosId = req.params.id;
//     const db = connection.promise();
//     let existingMoto = null;
//     db.query('SELECT * FROM motos WHERE id = ?', [motosId])
//       .then(([results]) => {
//         existingMoto = results[0];
//         if (!existingMoto) return Promise.reject('RECORD_NOT_FOUND');
//         return db.query('UPDATE motos SET ? WHERE id = ?', [req.body, motosId]);
//       })
//       .then(() => {
//         res.status(200).json({ ...existingMoto, ...req.body });
//       })
//       .catch((err) => {
//         console.error(err);
//         if (err === 'RECORD_NOT_FOUND')
//           res.status(404).send(`moto with id ${motosId} not found.`);
//         else res.status(500).send('Error updating a god');
//       });
//   });

router.put('/:id', (req, res) => {
    connection.query(
      'UPDATE motos SET ? WHERE id = ?',
      [req.body,req.params.id],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send('Error updating a moto');
        } else {
          if (result.affectedRows)
          {
            const updatedMoto={
                id:req.params.id,
                marque:req.body.marque,
                modele:req.body.modele,
                prix:req.body.prix}
            res.status(200).json(updatedMoto);
          } 
          else res.status(404).send('Moto not found.');
        }
      }
    );
  });

  router.delete('/:id', (req, res) => {
    connection.query(
      'DELETE FROM motos WHERE id = ?',
      [req.params.id],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send('Error deleting an moto');
        } else {
          if (result.affectedRows) res.status(200).send('🎉 moto deleted!');
          else res.status(404).send('moto not found.');
        }
      }
    );
  });

  
module.exports = router;