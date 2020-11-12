import React, { Fragment, useEffect ,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import pic from '../../images/profile.png'
import moment from 'moment'
import {   updatePartner } from '../../store/action/login'
const PartnerProfile = (props) => {
  const {name,email,phone,latitude,longitude,AccountStatus,partnerKey,date,profileUrl,verification} = props.location.state
  const [address, setaddress] = useState()
  const dispatch = useDispatch()
  useEffect(() => {
  const fetchNearby = async () => {
    const req =  await fetch(`https://us1.locationiq.com/v1/reverse.php?key=pk.6ae5458d22712d8adf1548f4610d6784&lat=${latitude && latitude}&lon=${longitude && longitude}&format=json`)
  
   const res = await req.json()
   setaddress(res.display_name)
  }
  fetchNearby()

  }, [])
  
//------------------handling update

const [user, setuser] = useState({
  Astatus:AccountStatus,
  veri:verification
})
const handleUpdate = ()=>{
 dispatch(updatePartner(partnerKey,user))
}
  const {Astatus,veri}=user

       return (
       <Fragment>
       <div style={{width:'80%',backgroundColor:'#ffffff',marginLeft:'auto',marginRight:'auto', padding:'20px'}}>
           <div className='profile'><img src={profileUrl ? profileUrl : pic} alt={pic} width='100%'  height='100%'/></div>
            <div className='data'>
              <div className='info'>
              <input type='text' defaultValue={name && name} name='name' className='update'/>
                <input type='text' defaultValue={email && email} name='email' className='update'/>
                <input type='text' defaultValue={phone && phone} name='phone' className='update'/>
                <input type='text' defaultValue={date && moment(date).format('MMMM Do YYYY, h:mm:ss a')} name='date' className='update'/>
                <input type='text' defaultValue={address && address} className='update' name='location'/>
                <input type='text' value={veri} name='verification' onChange={e => setuser({...user, veri:e.target.value})} className='update'/>
                <input type='text' value={Astatus} name='accountstatus' onChange={e => setuser({...user,Astatus:e.target.value})}  className='update'/>
                <input type='text' defaultValue={partnerKey && partnerKey} className='update'/>
              </div> 
              <button className='btn' onClick={handleUpdate}>Update</button>
            </div>
            </div>
       </Fragment>
    )
}

export default PartnerProfile
// onChange={txt => setusr({...usr,AccountStatus:txt.target.value})}