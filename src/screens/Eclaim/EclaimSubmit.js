import React,{useState,useRef,useEffect,useCallback} from 'react';
import { Text, StyleSheet, View, Image,Button, TouchableOpacity, Alert ,Keyboard,ScrollView} from 'react-native';
import * as SecureStore from 'expo-secure-store';

import InputField from '../subScreens/InputField';
import Checkbox from 'expo-checkbox';

import ImagePickerExample from './ImageTest';

import ProgressBar from '../subScreens/ProgressBar'
import {SignatureScreen} from '../subScreens/Signature'
import { Switch } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DateTimePicker from '@react-native-community/datetimepicker';
import Certification from './Certification';
import { wrap } from 'lodash';

const EclaimSubmit=({ navigation,route })=>{
  //------------------dropdown list design--------------------
  // const [dropdownOpen, setOpen] = useState(false);
  // const [dropdownValue, setValue] = useState(null);
  // const [dropdown, setDropdown] = useState([
  //   { label: "Ontario", value: "ON" },
  //   { label: "Quebec", value: "QC" },
  //   { label: "British Columbia", value: "BC" },
  //   { label: "Alberta", value: "AB" },
  //   { label: "Prince Edward Island", value: "PE" },
  //   { label: "Nova Scotia", value: "NS" },
  //   { label: "New Brunswick", value: "NB" },
  //   { label: "Saskatchewan", value: "SK" },
  //   { label: "Newfoundland and Labrador", value: "NL" },
  //   { label: "Manitoba", value: "MB" },
  // ]);
  // const onDropdownOpen = useCallback(() => {
  //   // setOpen(false);
  // }, []);
  // const { handleSubmit, control } = useForm();




    const [image, setImage] = useState([]);

    const [nextPage,setPage]=useState(1)
    const [contactfirstname,setFirstName]=useState()
    const [contactlastname,setLastName]=useState()

    const [street_address,setStreet]=useState()
    const [city,setC]=useState()
    const [province,setP]=useState()

    const [diagnosis,setDx]=useState('')
    const [date_symptoms,setDate]=useState(new Date("2000-01-01T00:00:00"))
    const [payees_payment_type,setMethod]=useState(false)
    const [payee_email,setEmail]=useState('')
    const [payees_payee_name,setName]=useState()
    const [payees_address,setAddress]=useState()
    const [payees_city,setCity]=useState()
    const [payees_province,setProvince]=useState()
    const [payees_postcode,setPostcode]=useState()
    const [date_first_physician,setPhysician]=useState(new Date("2000-01-01T00:00:00"))
    const [guardian_name,setGuardian]=useState()
    const [amount,setAmount]=useState(0)
    const [contact_phone,setContact]=useState('')
    const [guardian_contact,setGuardianContact]=useState('')
    const [treatment_before,setTreatment]=useState(false)
    const [signature, setSign] = useState(null);
    const [email, setE] = useState(null);
    const [postal_code, setPostal] = useState();
    const [payees_cheque, toggleCheque] = useState(false);

    const [fileID, setID] = useState([]);
    const [signID, setsignID] = useState();
    const [checked, setChecked] = React.useState(false);
    const [checked1, setChecked1] = React.useState(false);
    const [checked2, setChecked2] = React.useState(false);

    const[info,setInfo]=useState()



    useEffect(() => {
      async function fetchAsync() {
        let policyShowing = await SecureStore.getItemAsync('policy')
        let effective = await SecureStore.getItemAsync('effective_date')
        let insuredname1 = await SecureStore.getItemAsync('firstname')
        let insuredname2 = await SecureStore.getItemAsync('lastname')
        setInfo([policyShowing,effective,`${insuredname1}  ${insuredname2}`])
      }
  
      fetchAsync()
    }, [])






  async function imageUploadRequest(link,data){
    let token = await SecureStore.getItemAsync('token');
    let api_id = await SecureStore.getItemAsync('api_id');

      var formdata = new FormData();
      formdata.append(data[0],data[1])

      formdata.append('token', token);
      formdata.append('api_id', api_id);
      
      var requestOptions = {
        method: 'POST',
        body: formdata,
        headers: {
          'Content-Type': 'multipart/form-data'
        }         
      };

    

      var returnID=fetch(link, requestOptions)
      .then(response => {
       return response.json()
      })
      .then((data)=>{
       if(data.status==`OK`){
                return data.file_id
      }
      })
       .catch(error=>
        { 
          Alert.alert(
          'Cannot upload your signature, check your internet','',[]
        )
        return undefined
      }
       )

       return returnID

    }

    async function signSubmit(){
      if(signature!=null){
        var returnedID=await imageUploadRequest("https://claim.mmoo.ca/Api/imagepng",[`data`,signature])
        //---------url=https://claim.otcww.com/Api/imagepng------------------------------------------------------------
        if(typeof returnedID!==`undefined`&&returnedID){
           setsignID(returnedID)
           return returnedID
        }
        else{
         return undefined
        }
      }
      else{
        Alert.alert("please sign a valid signature","",[])
        return undefined
      }

    }

   
    // async function imageSubmit(){
      
    //   if(typeof image!='undefined'&&image.length>0){
    //       for(const i in image){
    //         await imageUploadRequest("https://claim.mmoo.ca/Api/image",[`userfile`,i])
    //       }
            
    //         //------url="https://claim.otcww.com/Api/image"-----------------------------------------------------
    //         if(fileID.length>0){
    //            console.log(fileID)
    //         }
    //         else{
    //           Alert.alert('returnId is null','',[])
    //           return
            
    //       }
    //   }
    //     else{
    //       Alert.alert('please select at least one image to upload')
    //       return 
    //     }
      

    // }



    const onToggleSwitch = () => setMethod(!payees_payment_type);

    async function onSubmit(){
      var converted=`[${fileID}]`
      var id=`${signID}`
      var formdata = new FormData();
      let api_id = await SecureStore.getItemAsync('api_id');
      let token = await SecureStore.getItemAsync('token');
      let gender = await SecureStore.getItemAsync('gender');
      let arrival_date = await SecureStore.getItemAsync('arrival_date');
      let policy = await SecureStore.getItemAsync('policy');
      let plan_id = await SecureStore.getItemAsync('plan_id');
      let dob = await SecureStore.getItemAsync('birthday');
      let product_short = await SecureStore.getItemAsync('product_short');
      let firstname= await SecureStore.getItemAsync('firstname');
      let lastname= await SecureStore.getItemAsync('lastname');
      let insure_email=await SecureStore.getItemAsync('email');
      let contact=await SecureStore.getItemAsync('phone');
     
      
      let arrivalDate=`${arrival_date}`
      formdata.append('imgfile',converted);
      formdata.append('sign_name',lastname);
      formdata.append('sign_image',id);
      formdata.append('api_id',api_id);
      formdata.append('token',token);
      // formdata.append('id','0');
      // formdata.append('physician_name',null);
      // formdata.append('clinic_name',null);
      // formdata.append('physician_street_address',null);
      // formdata.append('physician_suite_number',null);
      // formdata.append('physician_city',null);
      // formdata.append('physician_country',null);
      formdata.append('country',`CA`);
      // formdata.append('physician_post_code',null);
      // formdata.append('physician_telephone',null);
      // formdata.append('physician_alt_telephone',null);
      // formdata.append('physician_name_canada',null);
      // formdata.append('clinic_name_canada',null);
      // formdata.append('physician_street_address_canada',null);
      // formdata.append('physician_suite_number_canada',null);
      // formdata.append('physician_city_canada',null);
      // formdata.append('physician_province_canada',null);
      // formdata.append('physician_post_code_canada',null);
      // formdata.append('physician_telephone_canada',null);
      // formdata.append('physician_alt_telephone_canada',null);
      // formdata.append('full_name',null);
      // formdata.append('employee_name',null);
      // formdata.append('employee_street_address',null);
      // formdata.append('employee_suite_number',null);
      // formdata.append('employee_post_code',null);
      // formdata.append('city_town',null);
      // formdata.append('country2',null);
      // formdata.append('employee_telephone',null);
      // formdata.append('medication_date_1',null);
      // formdata.append('medication_1',null);
      // formdata.append('medication_date_2',null);
      // formdata.append('medication_2',null);
      // formdata.append('medication_date_3',null);
      // formdata.append('medication_3',null);
      // formdata.append('medication_date_3',null);
      // formdata.append('payment_type',null);
      // formdata.append('reason',null);
      // formdata.append('notes',null);
      formdata.append('diagnosis',diagnosis);
      // formdata.append('exinfo_type',null);
      // formdata.append('intnotes',null);
      formdata.append('processed_by','0');
      formdata.append('insured_first_name',firstname);
      formdata.append('insured_last_name',lastname);
      formdata.append('dob', dob);
      formdata.append('gender',gender);
      formdata.append('policy_no',policy);
      formdata.append('product_short',product_short);

      formdata.append('guardian_name',guardian_name);
      formdata.append('guardian_phone',guardian_contact);
      formdata.append('street_address',street_address);
      formdata.append('city',city);
      formdata.append('province',province);
      formdata.append('telephone',contact);
      formdata.append('email',insure_email);
      formdata.append('post_code',postal_code);
      formdata.append('arrival_date_canada',arrivalDate);
      formdata.append('arrival_date',arrivalDate);

      formdata.append('contact_first_name',contactfirstname);
      formdata.append('contact_last_name',contactlastname);
      formdata.append('contact_email',email);
      formdata.append('contact_phone',contact_phone);

      // formdata.append('status','0');
      formdata.append('treatment_before',treatment_before?`T`:'N');
      formdata.append('travel_insurance_coverage_guardians','N');
      formdata.append('other_insurance_coverage','N');
      formdata.append('exinfo_other_party','N');
      formdata.append('medical_description',diagnosis);
      formdata.append('date_symptoms',  date_symptoms.toISOString().split('T')[0]);
      formdata.append('date_first_physician',date_first_physician.toISOString().split('T')[0]);


//----------------------------------need to fill after----------------

      formdata.append('payees_payment_type',payees_payment_type? `email`:`cheque`);//--------------------------------------------------------------check----

      formdata.append('payees_payee_name',payees_payee_name||contactfirstname+" "+contactlastname);
      formdata.append('payees_address',payees_address||street_address);
      formdata.append('payees_city',payees_city||city);
      formdata.append('payees_province',payees_province||province);
      formdata.append('payees_country','Canada');
      formdata.append('payees_postcode',payees_postcode||postal_code);
      formdata.append('payees_email',payee_email);



      // formdata.append('exinfo_depature_date',null);
      // formdata.append('exinfo_return_date',null);
      // formdata.append('exinfo_destination',null);
      formdata.append('exinfo_spouse_insurance','N');
      formdata.append('exinfo_other_medical_insurance','N');
      formdata.append('exinfo_credit_card_insurance','N');
      formdata.append('exinfo_group_insurance','N');
      // formdata.append('exinfo_other_insurance_name',null);
      // formdata.append('exinfo_other_insurance_policy',null);
      // formdata.append('exinfo_other_insurance_number',null);
      // formdata.append('exinfo_other_insurance_phone',null);
      // formdata.append('exinfo_spouse_insurance_name',null);
      // formdata.append('exinfo_spouse_insurance_policy',null);
      // formdata.append('exinfo_spouse_insurance_number',null);
      // formdata.append('exinfo_spouse_insurance_phone',null);
      // formdata.append('exinfo_spouse_name',null);
      // formdata.append('exinfo_spouse_dob',null);
      formdata.append('exinfo_credit_card_insurance_name',null);
      formdata.append('exinfo_credit_card_number',null);
      formdata.append('exinfo_credit_card_expire',null);
      formdata.append('exinfo_credit_card_holder',null);
      formdata.append('exinfo_group_insurance_company',null);
      formdata.append('exinfo_group_insurance_policy',null);
      formdata.append('exinfo_group_insurance_member',null);
      formdata.append('exinfo_group_insurance_phone',null);
      formdata.append('exinfo_other_travel_insurance_explanation',null);
      formdata.append('exinfo_loss_type',null);
      formdata.append('exinfo_loss_describe',null);
      formdata.append('exinfo_loss_date',null);
      formdata.append('exinfo_loss_report_to',null);
      formdata.append('expenses_claimed_service_description',null);
      formdata.append('expenses_claimed_provider_name',null);
      formdata.append('expenses_claimed_referencing_physician',null);
      formdata.append('expenses_claimed_date_of_service',null);
      formdata.append('expenses_claimed_amount_client_paid_org',null);
      formdata.append('expenses_claimed_amount_claimed_org',null);
      formdata.append('expenses_claimed_amount_billed_org',null);
      formdata.append('expenses_claimed_currency',null);
      formdata.append('expenses_claimed_other_reimbursed_amount',null);
      formdata.append('exinfo_cancelled_date',null);
      formdata.append('exinfo_loss_reason',null);
      formdata.append('exinfo_sickness',null);
      formdata.append('exinfo_injury1_date',null);
      formdata.append('exinfo_physician_date',null);
      formdata.append('exinfo_injury_details',null);
      formdata.append('exinfo_injury_date',null);
      formdata.append('exinfo_patient_name',null);
      formdata.append('exinfo_death_date',null);
      formdata.append('exinfo_relation',null);
      formdata.append('exinfo_death_describe',null);
      formdata.append('exinfo_circumstances',null);
      formdata.append('exinfo_occured_date',null);
      formdata.append('exinfo_other_reason',null);
      formdata.append('exinfo_other_occurred_date',null);
      formdata.append('exinfo_cancel_reason',null);
      formdata.append('exinfo_other_party_reimbursed_refunded','N');
      formdata.append('date_symptoms_input',(new Date(date_symptoms)).toUTCString());
      formdata.append('date_first_physician_input',(new Date(date_first_physician.toISOString().split('T')[0])));
      formdata.append('exinfo_depature_date_input',null);
      formdata.append('exinfo_return_date_input',null);
      formdata.append('exinfo_cancelled_date_input',null);
      formdata.append('exinfo_injury1_date_input',null);
      formdata.append('exinfo_physician_date_input',null);
      formdata.append('exinfo_injury_date_input',null);
      formdata.append('exinfo_death_date_input',null);
      formdata.append('exinfo_other_occurred_date_input',null);
      formdata.append('expenses_claimed_date_of_service_input',null);
      // formdata.append('arrival_date_canada_input',arrivalDate);
      formdata.append('exinfo_loss_date_input',null);
      formdata.append('exinfo_spouse_dob_input',null);
      formdata.append('amount',amount);
      // formdata.append('sameAddress',`true`);
      // formdata.append('sameEmail',`true`);

      
      var requestOptions = {
        method: 'POST',
        body: formdata         
      };


      const result=fetch("https://claim.mmoo.ca/Api/submit", requestOptions)

//---------------------------------------------------url="https://claim.otcww.com/Api/submit"----------
      .then(response => {
       return response.json()
      })
      .then((data)=>{
      //------------------------------------------------------------
       if(data.status==`OK`){
                Alert.alert(`Your E-claim has successfully submited, reference ${data.application_id}`)
                return data.application_id
      }
       else{
         return Promise.reject(data)
       }
      })
       .catch(error=>
        { 
          console.log(error)
          Alert.alert(
          `Submission Failed, ${error.message}check your internet`,'',[]
        )
        return null 
      }
       )
      
      setImage([])
      setSign(``)
      return result
   }

   const onChange = (event, selectedValue) => {
    const currentDate = selectedValue || new Date();
    setDate(currentDate);
    Keyboard.dismiss()
} 

const onPhysician = (event, selectedValue) => {
  const getDate = selectedValue || new Date();
  setPhysician(getDate);
  Keyboard.dismiss()
} 

   

  
    return(
      <View style={{flex:0.99,padding:5}}>
        <KeyboardAwareScrollView contentContainerStyle={{alignItems: 'center'}}
        nestedScrollEnabled={true}
        persistentScrollbar={true}
        >

        <View  >
        {nextPage==1?
        <View >
          <View style={{flexDirection:'row'}}>
            <InputField  style={{width:185}} content="Contact First Name" setValue={setFirstName}/>

            <InputField  style={{width:185}} content="Last Name" setValue={setLastName}/>
          </View>
          <InputField style={{width:'80%'}} keyboardType='phone-pad' content="Contact Number" setValue={setContact}/>

          <InputField style={{width:'80%'}} keyboardType='email-address' content="Contact Email" setValue={setE}/>

          <InputField style={{width:'80%'}} content="Address" setValue={setStreet}/>

          <InputField style={{width:'80%'}}content="City" setValue={setC}/>

          <InputField style={{width:'80%'}} content="Province" setValue={setP}/>


              {/* <View style={{   
                marginHorizontal: 10,
                width: "50%",
                marginBottom: 15,
              }}>
                <DropDownPicker
                style={{borderColor: "#B7B7B7", height: 50}}
                open={dropdownOpen}
                value={dropdownValue} //dropdownValue
                items={dropdown}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setDropdown}
                placeholder="Select Province"
                placeholderStyle={{color: "grey"}}
                onOpen={onDropdownOpen}
                zIndex={3000}
                zIndexInverse={1000}
              />
              </View> */}

          <InputField style={{width:'80%'}} content="Postal Code" setValue={setPostal}/>

          <InputField style={{width:'80%'}}  content="Guardian Name" setValue={setGuardian}/>
          
          <InputField style={{width:'80%'}} keyboardType='phone-pad' content="Guardian Contact" setValue={setGuardianContact}/>

          
            
        </View>
        :null}
         {nextPage==2?

    <View >
       <InputField style={{width:'80%'}} keyboardType='decimal-pad' content="Claim Amount $" setValue={setAmount}/>
       <InputField style={{width:'80%'}} content="Symptom" setValue={setDx}/>
       
       <View style={{flexDirection:'row', alignItems:'center',justifyContent:'center'}}>
      
       <Text style={{fontSize:18, fontWeight:'bold'}}>
            Symptom Starting Date: 
       </Text>
 
       <DateTimePicker  mode="date" display='calendar' value={new Date(date_symptoms)} onChange={onChange} style={{width:160,height:100}}/>
       
 
       </View>
 
       <View style={{alignItems:'center',flex:1,flexDirection:'row',marginTop:15,marginBottom:10}}>
         <Text style={{fontSize:18,fontWeight:'bold', flex:0.9,alignItems:"center"}}>
             Sought Treatment Before?            
         </Text>
         <Text style={{fontSize:18,fontWeight:'bold'}}> {treatment_before?`Yes`:`No`}</Text>
         <Switch  style={{margin:10}} value={treatment_before} onValueChange={()=>setTreatment(!treatment_before)} />
       
       </View>
         
       <View style={{flexDirection:'row', alignItems:'center',justifyContent:'center'}}>
      
      <Text style={{ fontSize:18, fontWeight:'bold'}}>
            Date first visit physician: 
      </Text>
 
      <DateTimePicker  mode="date" display='calendar' value={new Date(date_first_physician)} onChange={onPhysician} style={{width:160,height:100}}/>
      </View>
     </View>  
    :null}



         {nextPage==3?
         
          <View style={{alignItems:'center',marginTop:20}}>
            
            <View style={{flexDirection:'row',alignItems:"center",justifyContent:'space-between'}}>
            <Text style={{fontSize:20,fontWeight:'bold',alignItems:"center"}}>
              Payee Type:   {!payees_payment_type?'By Cheque':'E-transfer'} 
            </Text>
            <Switch  style={{margin:10}} value={payees_payment_type} onValueChange={onToggleSwitch} />
            </View>

            {payees_payment_type?
            <>
            <View style={{ justifyContent:'center',width:"100%"}}>
              <InputField style={{width:"100%"}} content="Payee Name" setValue={setName}/>
              <InputField style={{width:"100%"}}  content="Payee Email"  keyboardType='email-address' setValue={setEmail}/>
            </View>

            <View>


            </View>
            </>
              :
              
              <View  style={{width:"100%"}}>
                <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:30,alignContent:"center"}}>
                  <Text style={{fontSize:18,fontWeight:'600'}}>
                    same as contact?
                  </Text>
                  <Switch  style={{marginBottom:5}} value={payees_cheque} onValueChange={()=>toggleCheque(!payees_cheque)} />
                </View>
                  {payees_cheque?
                  <View style={{alignContent:'space-between',marginTop:20}}>
                    <Text style={{fontSize:20,fontWeight:'bold'}}>Payee Name:  {contactfirstname} {contactlastname}</Text>
                    <Text style={{fontSize:20,fontWeight:'bold'}}>Payee Address:   {street_address} {city} {province}</Text>
                  </View>
                  :
                   <View  >
                    <InputField style={{width:'100%'}}  content="Payee Name" setValue={setName}/>
                    <InputField style={{width:'100%'}}   content="Address" setValue={setAddress}/>
                    <InputField style={{width:'100%'}} content="City" setValue={setCity}/>
                    <InputField style={{width:'100%'}} content="Province" setValue={setProvince}/>
                    <InputField style={{width:'100%'}}  content="Postal Code" setValue={setPostcode}/>
                  </View>
                  }
                 
              </View>
          }
          </View>:null
         
        }
          

        {nextPage==4?
        <View >
          <ImagePickerExample setImage={setImage} image={image} setID={setID} fileID={fileID}></ImagePickerExample>
        </View>  
       :null}


       {
         nextPage==5?
         <Certification setPage={setPage} nextPage={nextPage}></Certification>:null
       }
     
        </View>

      </KeyboardAwareScrollView>
      
      {nextPage==6?
        <View style={{height:610,marginBottom:40}}>
            <SignatureScreen signature={signature} setSign={setSign}></SignatureScreen>
          </View>
       :null}

      {nextPage==7?
      <View style={{flex:10}}>
        <View style={{flexDirection:'row', justifyContent:'space-between',margin:5}}>
        <Text style={{ fontWeight:'bold',fontSize:18}}>Your Policy Number:</Text>
        <Text style={{ fontWeight:'bold',  fontSize:18}}> {info[0]||''}</Text>
        </View>

        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />

        <View style={{flexDirection:'row', justifyContent:'space-between',margin:5}}>
        <Text style={{ fontWeight:'bold',fontSize:18,marginTop:20,}}>Insured Name:</Text>
        <Text style={{ fontWeight:'bold', marginTop:20,fontSize:18}}> {info[2]||''}</Text>
        </View>

        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />

        <View style={{flexDirection:'row', justifyContent:'space-between',margin:5}}>
        <Text style={{ fontWeight:'bold', marginTop:15,fontSize:18}}>Effective Date:</Text>
        <Text style={{ fontWeight:'bold', marginTop:15,fontSize:18}}> {info[1]||''}</Text>
        </View>

        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />

        <View style={{flexDirection:'row', justifyContent:'space-between',margin:5}}>
        <Text style={{ fontWeight:'bold', marginTop:15,fontSize:18}}>Symptom:</Text>
        <Text style={{ fontWeight:'bold', marginTop:15,fontSize:18}}> {diagnosis}</Text>
        </View>

        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />

        <View style={{flexDirection:'row', justifyContent:'space-between',margin:5}}>
        <Text style={{ fontWeight:'bold',fontSize:18,marginTop:15}}>Claim Amount:</Text>
        <Text style={{ fontWeight:'bold', marginTop:15,fontSize:18}}> ${amount}</Text>
        </View>

        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />

        <View style={{flexDirection:'row', justifyContent:'space-between',margin:5, marginBottom:50}}>
        <Text style={{ fontWeight:'bold',fontSize:18,marginTop:20}}>Payee:</Text>
        <Text style={{ fontWeight:'bold', marginTop:20,fontSize:18}}> 
        {payees_payee_name||contactfirstname+" "+contactlastname} {payees_payment_type?payee_email:(payees_address||street_address, payees_city||city, payees_province||province,payees_postcode||postal_code)}
        </Text>
        </View>



        <View style={{flexDirection:'row', justifyContent:'space-between',margin:5,alignItems:'baseline'}}>
          <Text style={{fontWeight:'600', marginTop:30,fontSize:18,flexBasis:'90%'}}>Have you submitted under the correct policy?</Text>
              <Checkbox  value={checked}
              style={{marginLeft:10}}
              onValueChange={() => {
              setChecked(!checked);
                }
              }
              /> 
         </View>

         <View style={{flexDirection:'row', justifyContent:'space-between',margin:5 ,alignItems:'baseline'}}>
          <Text style={{ fontWeight:'600',marginTop:30,fontSize:18,flexBasis:'90%'}}>Have you submitted under the correct insured name?</Text>
              <Checkbox  value={checked1}
              style={{marginLeft:10}}
              onValueChange={() => {
              setChecked1(!checked1);
                }}
              />
        </View>

        <View style={{flexDirection:'row', justifyContent:'space-between',margin:5,alignItems:'baseline'}}>
          <Text style={{ fontWeight:'600',marginTop:30, fontSize:18,flexBasis:'90%'}}>Is you claimed amount below $1000?</Text>
              <Checkbox  value={checked2}
              style={{marginLeft:10}}
              onValueChange={() => {
              setChecked2(!checked2);
            }}
          />
        </View>

        </View>
       :null}
       <View style={[{flexDirection:'row',justifyContent:'space-between',width:350, alignSelf:'center' },nextPage==5?{display: 'none'}:null]}>
      <TouchableOpacity 
        style={{}}
        onPress={()=>{
          if(nextPage!=1){
            setPage(nextPage-1)
          }
        }}> 
        <Text style={{fontSize:30,fontWeight:'bold' }} >{nextPage!=1?`Previous`:``}</Text>

        </TouchableOpacity>

      <TouchableOpacity 
        style={{}}
        onPress={async()=>{
          if(nextPage==6){
            var verified=await signSubmit()
            if (typeof verified!="undefined"){
                 setPage(nextPage+1)
            }
//--------------------------------------------------------------------------------bug------
          }
          else if(nextPage==7){
             if(checked&&checked1&&checked2){
              var responseResult=await onSubmit()
              if(responseResult!=null){
                setPage(1)
                navigation.navigate('E-claim Portal')
              }
             }
             else{
              Alert.alert("Please tick all the fields")
             }  
          }

          else if(nextPage==4){
            // await imageSubmit()

            if(image.length<1){
              Alert.alert("Please select at least one image to upload")
            }
            else{
              if (fileID.length<1){
                Alert.alert("Image upload failed")
              }
              else{
                setPage(nextPage+1)
              }
            }
          }
          else{
            setPage(nextPage+1)
          }
        }}> 
        <Text style={{fontSize:30,fontWeight:'bold'}}>{nextPage==7?`Submit`:`Next`}</Text>

        </TouchableOpacity>
        </View>
        <ProgressBar style={{alignItems: 'center',height:15,marginTop:30, borderRadius:10}} progress={Math.floor(nextPage/7*100)/100}></ProgressBar>

      </View>

    )}



export default EclaimSubmit;