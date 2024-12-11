const mongoose = require('mongoose');


const URI='mongodb+srv://dama:dama@clustercieepfree.al5es.mongodb.net/DAMA2425?retryWrites=true&w=majority&appName=ClusterCIEEPFree';

mongoose.connect(URI).
then(db=> console.log('DB COnnected'))
    .catch(err => console.error(err))

module.exports = mongoose;
