pragma solidity >=0.4.0 <0.7.0;

// titre du contract = PatientRecords
// laisse l'acces aux centre hospitalier de stocker les infos des patient a partir de leur reseau respectifs
// ces enregistrements peuvent etre acceder par d'autres centres avec l'accord du patient qui donnera son nom



contract Ownable {
    address public owner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    constructor() public {
        owner = msg.sender;
    }


    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0));
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }

}



interface InterfacePatient {


    /*
    * Public functions
    */
    /// fonction pour ajouter un nouveau centre
    function addCentre(address _centre) external;
    /// fonction pour supprimer un centre
    function removeCentre(address _centre) external;

    /// fonction pour ajouter un nouveau patient
    function addPatient(address _patient) external;

   /// fonction pour supprimer un patient
    function removePatient(address _patient) external;

    /// fonction pour ajouter un nouveau enregistrement info patient

    // function addRecord(
    //     address _patientAddress,
    //     address _centre,
    //     string calldata _nommedecin,
    //     string calldata _passphrasem,
    //     string calldata _adressmailm,
    //     string calldata _raisonvisite) ;

    // function addRecord2(
    //     address _patientAddress,
    //     address _centre,
    //     string calldata _maladiedetecte,
    //     string calldata _traitementprescrit,
    //     string calldata _etatpatient) public;

   /// fonction pour ajouter un nouveau enregistrement info dse medical textual data hashes par ipfs patient

    function addmtd(
        address _patientAddress,
        address _centre,
        string calldata _mtdhash) external;

/// fonction pour ajouter un nouveau enregistrement info dse medical numeric data hashes par ipfs patient

    function addmnd(
        address _patientAddress,
        address _centre,
        string calldata _mndhash) external;


    /// fonction pour ajouter un nouveau enregistrement info dse medical private data hashes par ipfs patient

    function addmpd(
        address _patientAddress,
        address _centre,
        string calldata _mpdhash) external;

    /// fonction autorise patient d'ajouter son nom aux infos

    function addName(uint256 _recordID, string calldata _name) external;

    /// fonction autorise patient d'ajouter son mail aux infos

    function addMail(uint256 _recordID, string calldata _adressmailp) external;

    /// fonction autorise patient d'ajouter sa passphrase aux infos

    function addPassphrasep(uint256 _recordID, string calldata _passphrasep) external;


    // fonction qui affche par le medecin , les infos du patient
    function getRecord(uint _recordID, address _patientAddress) external view
      returns(
        address _centre,
        string memory _nommedecin,
        string memory _maladiedetecte,
        string memory _traitementprescrit,
        string memory _etatpatient);

     // fonction qui affche par le medecin , les infos hashes du patient
    function getDse(uint _recordID, address _patientAddress) external view
      returns(
        address _centre,
        string memory _mtdhash,
        string memory _mndhash,
        string memory _mpdhash);


    ///autoriser un centre a avoir le nombre d'enregistrements patient
    function getRecordByName(string calldata _name) external view returns (uint256 numberOfRecords);

    /// autoriser un centre ou un chercheur a avoir le nombre d;enregistrements patients entre dex dates

    function getCurrentPatients(uint from, uint to) external view returns (uint _numberOfPatients);

}




contract PatientRecords is Ownable, InterfacePatient{

    /*
    * Evenements
    */
    //event Deposit(address indexed sender, uint256 value);
    event CentreAddition(address centre); // ajout de centre
    event CentreRemoval(address centre);  // suppression de centre
    event PatientAddition(address patient);  // ajout de patient
    event PatientMtdAdded(address patient);  // ajout de dse mtd patient
    event PatientMndAdded(address patient);  // ajout de dse mnd patient
    event PatientMpdAdded(address patient);  // ajout de dse mpd patient
    event PatientRemoval(address patient);  // suppression de centre
    event PatientRecordAdded(uint256 recordID, address patientAddress);  // ajout de dse de patient
    event NameAddedToRecords(uint256 recordID, address patientAddress);  //
    event PatientRecordAdded1(uint256 recordID); //ajout de patient en json
    event MailAddedToRecords(uint256 recordID, address patientAddress);  //
    event PasspAddedToRecords(uint256 recordID, address patientAdd);

    /*
    * variables constantes
    */
    uint constant public MAX_COUNT = 100;

    /*
    * mapping
    */
    mapping (address => bool) public isPatient; // retourne oui si c'est vraiment le patient
    mapping (address => bool) public isCentre; // retourne oui si cest vraiment le centre
    mapping (uint256 => mapping (address => Records)) records; // retourner les enregistrements du patient
     // retourner les enregistrements dse hashes du patient
    mapping (uint256 => Records) recordsjson;
    mapping (uint256 => ipfshash) ipfshashs;
    mapping (uint256 => dateRange) dateRanges; //retourne les dates d'admission et de liberation du centre medical
    mapping (address => mapping (string => uint256)) mappingByName; // mapper l'adresse a partir du nom du patient
    mapping (address => mapping (string => uint256)) mappingByMail; // mapper le mail  a partir du nom du patient
    mapping (address => mapping (string => uint256)) mappingByPassp; // mapper la passprase a partir du nom du patient
    uint256 public recordCount = 0; // compter les enregistrements des patients
    uint256 public boolc = 0;
    uint256 public boolp = 0;

// premiere enregistrement de patient, structure des variables necessaires enregistres en premier lieu
    struct Records {
        bool providedName;
        string name;
        address patient;
        address centre;
        string nomcentre;
        string adressmailm;
        string adressmailp;
        string nommedecin;
        string passphrasem;
        string passphrasep;
        uint256 admissionDate;
        uint256 dischargeDate;
        string visitReason;
        string maladiedetecte;
        string traitementprescrit;
        string etatpatient;
        string mtdhash;
        string mndhash;
        string mpdhash;
    }
// ajout des date d'admission et de date de liberation du centre
    struct dateRange {
        uint256 admissionDate;
        uint256 dischargeDate;
    }

// ajout des hashes ipfs des donnees numeriques enregistres sur ipfs
    struct ipfshash{
        string mtdhash;
        string mndhash;
        string mpdhash;
    }

  // ajoutdes maladies detectes par patient, les traiteent et l'etat des patients
    struct maladie{
        string maladiedetecte;
        string traitementprescrit;
        string etatpatient;
    }


    Ownable own;
    InterfacePatient interf;
    /*
    * Modifiers
    */

// counter les enregistrements
    modifier validParameters(uint count) {
        require(count <= MAX_COUNT && count != 0);
        _;
    }

// fonction retourne non, car adresse du centre n'existe pas
    modifier centreDoesNotExist(address centre) {
        require(!isCentre[centre]);
        _;
    }
// retourne oui apres verification de l'existence du centre
    modifier centreExist(address centre) {
        require(isCentre[centre]);
        _;
    }
// fonction qui retourne faux car adresse de patient n'existe pas
    modifier patientDoesNotExist(address patient) {
        require(!isPatient[patient]);
        _;
    }
// retourne vrai car adresse patient existe
    modifier patientExist(address patient) {
        require(isPatient[patient]);
        _;
    }
// retounne vrai si adress non null
    modifier notNull(address _address) {
        require(_address != address(0));
        _;
    }
// retourne vrai, car nom possede une valeur
    modifier notEmpty(string memory name) {
        bytes memory tempString = bytes(name);
        require(tempString.length != 0);
        _;
    }

// retourne vrai, car nom possede une valeur
    modifier emptPassphrasem(string memory passphrasem) {
        bytes memory tempString = bytes(passphrasem);
        require(tempString.length != 0);
        _;
    }


// seulement le patient peut avoir acces a la fonction qui sera appele sur ce modifier
    modifier onlyPatient(uint256 recordId) {
        require(records[recordId][msg.sender].patient == msg.sender);
        _;
    }
// seulement un patient du centre peut avoir acces a la fonction qui sera appele sur ce modifier
    modifier onlyCentre(uint256 recordId, address _patientAddress) {
        require(records[recordId][_patientAddress].centre == msg.sender);
        _;
    }
// retourne vrai si les enregistrements de ce patient existe
    modifier recordExists(uint256 recordId, address patientAddress) {
        address _centre = records[recordId][patientAddress].centre;
        require(_centre != address(0));
        _;
    }


// retourne vrai si les enregistrements de ce patient existe
    modifier hashesExists(uint256 recordId, address patientAddress) {
        address _centre = records[recordId][patientAddress].centre;
        require(_centre != address(0));
        _;
    }


// retourne vrai, car le patient accorde son autorisation en donnant son nom
    modifier patientProvidedName(uint256 recordId, address patient) {
        require(records[recordId][patient].providedName == true);
        _;
    }
// retourne faux, si patient refuse l'acces a ses donnnees
    modifier patientNotProvidedName(uint256 recordId, address patient) {
        require(records[recordId][patient].providedName == false);
        _;
    }

    modifier higherThanZero(uint256 _uint) {
        require(_uint > 0);
        _;
    }

    /*
     * Public fonctions
     */
    /// Contract constructeur initial des patients et centres.
    /// parametres _centres Address tableau des centres initiales.
    /// parametres _patients Address tableau des patients initiatles

    constructor()public{


    }

    /// fonction pour autoriser l'ajout d'un centre
    // verifier que le centre n'existe pas encore
    // seulement un medecin poura le faire
    function addCentre(address _centre) public
      centreDoesNotExist(_centre)
    {
        isCentre[_centre] = true;
        boolc=1;
        emit CentreAddition(_centre);
    }

    function centreExists(address _centre) public
    centreExist(_centre)
    view
    returns(string memory)
      {
        if (boolc == 1){
        return ("ok centre existe");
     }
     else{
          return ("centre n existe pas");
      }
 }

/// fonction pour autoriser la suppression d'un centre
    // verifier que le centre existe deja
    // seulement un medecin qui se connecte avec une adresse du centre pourra supprinmer le centre
    function removeCentre(address _centre)
        external
        onlyOwner
        centreExist(_centre)
    {
        isCentre[_centre] = false;
        emit CentreRemoval(_centre);
    }

    /// fonction pour autoriser l'ajout d'un patient
    // verifier que le patient n'existe pas encore
    // seulement un medecin poura le faire
    function addPatient(address _patient)
        public
        patientDoesNotExist(_patient)
    {
        isPatient[_patient] = true;
        boolp=1;
        emit PatientAddition(_patient);
    }

    function patientExists(address _patient) public
    patientExist(_patient)
    view
    returns(string memory)
      {
        if (boolp == 1){
        return ("ok patient existe");
     }
     else{
          return ("patient n existe pas");
      }
 }
    /// fonction pour autoriser l'ajout de dse MTD patient
    // verifier que le patient existe deja
    // seulement un medecin poura le faire
    function addMtdpatient(address _patient)
        external
        onlyOwner
        patientExist(_patient)
        notNull(_patient)
    {
        isPatient[_patient] = true;
        emit PatientMtdAdded(_patient);
    }


    /// fonction pour autoriser l'ajout de dse MND patient
    // verifier que le patient existe deja
    // seulement un medecin poura le faire
    function addMndpatient(address _patient)
        external
        onlyOwner
        patientExist(_patient)
        notNull(_patient)
    {
        isPatient[_patient] = true;
        emit PatientMndAdded(_patient);
    }

    /// fonction pour autoriser l'ajout de dse MPD patient
    // verifier que le patient existe deja
    // seulement un medecin poura le faire
    function addMpdpatient(address _patient)
        external
        onlyOwner
        patientExist(_patient)
        notNull(_patient)
    {
        isPatient[_patient] = true;
        emit PatientMtdAdded(_patient);
    }


    /// fonction pour autoriser la suppression d'un patient
    // verifier que le patient existe deja
    // seulement un medecin poura le faire
    function removePatient(address _patient)
        external
        onlyOwner
        patientExist(_patient)
    {
        isPatient[_patient] = false;
        emit PatientRemoval(_patient);
    }


    /// Fonctions autoriser les ajouts denregistrements patient
    /// avec les parametres _patientAddress address of the patient for record.
    ///  _centre address of the centre for record.
    /// _nommedecin string nom du medecin traitant
    ///  _admissionDate date of admission, simple uint.
    ///  _dischargeDate date of discharge, simple uint.
    ///  _visitReason internal code for reason for visit.
    /// le medecin cree le patient sans renseigner le nom du patient
    function addRecord (
        address _patientAddress,
        address _centre,
        string memory _nommedecin,
        string memory _passphrasem,
        string memory _adressmailm,
        string memory _raisonvisite)
        public
        patientExist(_patientAddress)
        centreExist(_centre)
    {
        records[recordCount][_patientAddress].providedName = false;
        records[recordCount][_patientAddress].patient = _patientAddress;
        records[recordCount][_patientAddress].centre = _centre;
        records[recordCount][_patientAddress].nommedecin= _nommedecin;
        records[recordCount][_patientAddress].adressmailm= _adressmailm;
        records[recordCount][_patientAddress].passphrasem= _passphrasem;
        records[recordCount][_patientAddress].visitReason= _raisonvisite;

        emit PatientRecordAdded(
            recordCount,
            _patientAddress);

        recordCount += 1;
    }

    function addRecord2 (
        address _patientAddress,
        address _centre,
        string memory _maladiedetecte,
        string memory _traitementprescrit,
        string memory _etatpatient)
        public
        patientExist(_patientAddress)
        centreExist(_centre)
    {
        records[recordCount][_patientAddress].providedName = false;
        records[recordCount][_patientAddress].patient = _patientAddress;
        records[recordCount][_patientAddress].centre = _centre;
        records[recordCount][_patientAddress].maladiedetecte= _maladiedetecte;
        records[recordCount][_patientAddress].traitementprescrit= _traitementprescrit;
        records[recordCount][_patientAddress].etatpatient= _etatpatient;

        emit PatientRecordAdded(
            recordCount,
            _patientAddress);

        recordCount += 1;
    }
 function addRecord3 (
        address _centre,
        string memory _nompatient,
        string memory _nommedecin,
        string memory _raisonvisite,
        string memory _maladiedetecte,
        string memory _traitementprescrit,
        string memory _etatpatient)
        public
        centreExist(_centre)
    {
        recordsjson[recordCount].centre = _centre;
        recordsjson[recordCount].name= _nompatient;
        recordsjson[recordCount].nommedecin= _nommedecin;
        recordsjson[recordCount].visitReason= _raisonvisite;
        recordsjson[recordCount].maladiedetecte= _maladiedetecte;
        recordsjson[recordCount].traitementprescrit= _traitementprescrit;
        recordsjson[recordCount].etatpatient= _etatpatient;

        emit PatientRecordAdded1(
            recordCount);

        recordCount += 1;
    }
    
    function getRecord3(uint256 _recordID,address _centre)
        public
            centreExist(_centre)
             view
                returns (
                    string memory _nompatient,
                    string memory _nommedecin,
                    string memory _maladiedetecte,
                    string memory _traitementprescrit,
                    string memory _etatpatient
                )
            {
                _nompatient = recordsjson[_recordID].name;
                _nommedecin = recordsjson[_recordID].nommedecin;
                _maladiedetecte = recordsjson[_recordID].maladiedetecte;
                _traitementprescrit = recordsjson[_recordID].traitementprescrit;
                _etatpatient = recordsjson[_recordID].etatpatient;

    }

// enregistrer  des donnees textuels hashes
       function addmtd (
        address _patientAddress,
        address _centre,
        //uint256 _passphrasem,
        string calldata _mtdhash
        )
        external
        onlyOwner
        patientExist(_patientAddress)
        centreExist(_centre)
    {

        ipfshashs[recordCount].mtdhash = _mtdhash;

        emit PatientRecordAdded(recordCount, _patientAddress);

        recordCount += 1;
    }

    // enregistrer  des donnees numeric hashes
       function addmnd (
        address _patientAddress,
        address _centre,
        string calldata _mndhash
        )
        external
        onlyOwner
        patientExist(_patientAddress)
        centreExist(_centre)
    {

        ipfshashs[recordCount].mndhash = _mndhash;

        emit PatientRecordAdded(recordCount, _patientAddress);

        recordCount += 1;
    }

    // enregistrer  des donnees private hashes
       function addmpd (
        address _patientAddress,
        address _centre,
        string calldata _mpdhash
        )
        external
        onlyOwner
        patientExist(_patientAddress)
        centreExist(_centre)
    {

        ipfshashs[recordCount].mpdhash = _mpdhash;

        emit PatientRecordAdded(recordCount, _patientAddress);

        recordCount += 1;
    }



    /// fonction pour autoriser un chercheur ou un centre de voir le nombre de dossiers enregistrement pour un patient par centre
    /// avec parametre le nom du patient
    function getRecordByName(string calldata _name)
        external
        centreExist(msg.sender)
        view
        returns (uint256 numberOfRecords)
    {
        if (mappingByName[msg.sender][_name] != 0) {
            numberOfRecords = mappingByName[msg.sender][_name];
            return numberOfRecords;
        }
        else
            return 0;
    }

    /// fonction qui autorise un chercheur a voir le nombre de patient enregistre entre deux date
    /// avec comme parametre la date debut
    /// et la date de fin
    function getCurrentPatients(uint from, uint to)
        external
        centreExist(msg.sender)
        view
        returns (uint _numberOfPatients)
    {
        uint i;
        _numberOfPatients = 0;
        for(i = 0; i < recordCount; i++) {
            if(dateRanges[i].admissionDate >= from && dateRanges[i].dischargeDate <= to)
            _numberOfPatients += 1;
        }
    }


    /// fonction qui autorise le patient d'ajouter son nom a l'enregistrement deja fait par le medecin
    /// avec les parametres comme _recordID ID de ce patient.
    /// et le nom _name Name du patient
    // seul le patient peut le faire
    function addName(uint256 _recordID, string calldata _name)
        external
        patientExist(msg.sender)
        onlyPatient(_recordID)
        recordExists(_recordID, msg.sender)
        notEmpty(_name)
        patientNotProvidedName(_recordID, msg.sender)
    {
        records[_recordID][msg.sender].providedName = true;
        records[_recordID][msg.sender].name = _name;
        address centreInRecord = records[_recordID][msg.sender].centre;
        mappingByName[centreInRecord][_name] += 1;

        emit NameAddedToRecords(_recordID, msg.sender);
    }



     /// fonction qui autorise le patient d'ajouter son nom a l'enregistrement deja fait par le medecin
    /// avec les parametres comme _recordID ID de ce patient.
    /// et le nom _name Name du patient
    // seul le patient peut le faire
    function addMail(uint256 _recordID, string calldata _adressmailp)
        external
        patientExist(msg.sender)
        onlyPatient(_recordID)
        recordExists(_recordID, msg.sender)
        patientNotProvidedName(_recordID, msg.sender)
    {
        records[_recordID][msg.sender].providedName = true;
        records[_recordID][msg.sender].adressmailp = _adressmailp;
        address centreInRecord = records[_recordID][msg.sender].centre;
        mappingByMail[centreInRecord][_adressmailp] += 1;

        emit MailAddedToRecords(_recordID, msg.sender);
    }


       /// fonction qui autorise le patient d'ajouter son nom a l'enregistrement deja fait par le medecin
    /// avec les parametres comme _recordID ID de ce patient.
    /// et le nom _name Name du patient
    // seul le patient peut le faire
    function addPassphrasep(uint256 _recordID, string calldata _passphrasep)
        external
        patientExist(msg.sender)
        onlyPatient(_recordID)
        recordExists(_recordID, msg.sender)
        patientNotProvidedName(_recordID, msg.sender)
    {
        records[_recordID][msg.sender].providedName = true;
        records[_recordID][msg.sender].passphrasep = _passphrasep;
        address centreInRecord = records[_recordID][msg.sender].centre;
        mappingByPassp[centreInRecord][_passphrasep] += 1;

        emit PasspAddedToRecords(_recordID, msg.sender);
    }



    /// fonction pour autoriser un centre d'avoir acces aux infos dun patient
    /// avec les paraetres _recordID ID de ce patient.
    /// et _patientAddress address du patient pour acceder a ses infos.
    // seul un medecin du centre peut acceder et il faut l'acord du patient
    function getRecord(uint _recordID, address _patientAddress)
        external
        recordExists(_recordID, _patientAddress)
        patientProvidedName(_recordID, _patientAddress)
        onlyCentre(_recordID, _patientAddress)
        view
        returns (
            address _centre,
            string memory _nommedecin,
            string memory _maladiedetecte,
            string memory _traitementprescrit,
            string memory _etatpatient
        )
    {
        _centre = records[_recordID][_patientAddress].centre;
        _nommedecin = records[_recordID][_patientAddress].nommedecin;
        _maladiedetecte = records[_recordID][_patientAddress].maladiedetecte;
        _traitementprescrit = records[_recordID][_patientAddress].traitementprescrit;
        _etatpatient = records[_recordID][_patientAddress].etatpatient;


    }

     function getDse(uint _recordID, address _patientAddress)
        external
        recordExists(_recordID, _patientAddress)
        patientProvidedName(_recordID, _patientAddress)
        onlyCentre(_recordID, _patientAddress)
        view
        returns (
            address _centre,
            string memory _mtdhash,
            string memory _mndhash,
            string memory _mpdhash
        )
    {
        _centre = records[_recordID][_patientAddress].centre;
        _mtdhash= records[_recordID][_patientAddress].mtdhash;
        _mndhash= records[_recordID][_patientAddress].mndhash;
        _mpdhash= records[_recordID][_patientAddress].mpdhash;

    }

    function calcul(uint _a, uint _b) external onlyOwner
    view
    returns (uint _c) {
        _c=_a+_b;
        return _c;
    }
    
    function getAdressC() public 
    view 
    returns (address _centreAddress) {
        _centreAddress=owner;
        return _centreAddress;
    }

}
