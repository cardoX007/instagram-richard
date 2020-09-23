import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './Post';
import { auth, db } from './firebase'
import  Modal from '@material-ui/core/Modal';
import { makeStyles} from '@material-ui/core/styles';
import { Button, Input } from '@material-ui/core';
import ImageUpload from './ImageUpload';
import InstagramEmbed from 'react-instagram-embed'

function getModalStyle() {
  const top = 50 ;
  const left = 50 ;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 300,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
//  from modal
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

//React Hooks
  const [posts, setPosts]= useState([]);
  const[open, setOpen] = useState (false);
  const[openSignIn, setOpenSignIn] = useState (false);
  const [username, setUsername] = useState('')
  const [email, setEmail ]= useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(()=>{
   const unsubscribe= auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        console.log(authUser);

        setUser(authUser);

      }else{
        setUser(null);
      }
    })

    return ()=>{

      //clean up the useeffect actions
      unsubscribe();
    }
  }, [user, username])

  
  // useEffect runs a piece of code based on a specific condition
  {/** https://insta-clone-a7d90.web.app */}

  useEffect(()=>{
    db.collection('posts').onSnapshot(snapshot=>{
      setPosts(snapshot.docs.map(doc=>({
        id: doc.id,
         post: doc.data()

        })));

        
    })
  }, []);

  const signIn = (event) =>{
    event.preventDefault();
    auth
    .signInWithEmailAndPassword(email, password)
    .catch(error=> alert(error.message));
    setOpenSignIn(false);
  }

  const signUp = (event)=>{
      event.preventDefault();
      auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser)=>{
        return authUser.user.updateProfile({
          displayName:username
        })
      })
      .catch((error)=> alert(error.message));
      setOpen(false);
  }
  return (
    <div className="app">
      
      


      <Modal
        open={openSignIn}
        onClose={()=> setOpenSignIn(false)}
        
      >
      <div style={modalStyle} className={classes.paper}>
        <form className="app__signup">
          <center>
          <img
              className="app__headerImage"
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              alt="">
            </img>
          </center>
            
            <Input
            placeholder ="email"
            type="text"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            />
            <Input
            placeholder ="password"
            type="password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signIn}> Sign In</Button>
        
      
        </form>
      
    </div>
    </Modal>
    
      <Modal
        open={open}
        onClose={()=> setOpen(false)}
        
      >
      <div style={modalStyle} className={classes.paper}>
        <form className="app__signup">
          <center>
          <img
              className="app__headerImage"
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              alt="">
            </img>
          </center>
            <Input
            placeholder ="username"
            type="text"
            value={username}
            onChange={(e)=> setUsername(e.target.value)}
            />
            <Input
            placeholder ="email"
            type="text"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            />
            <Input
            placeholder ="password"
            type="password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signUp}> Sign Up</Button>
        
      
        </form>
      
    </div>
    </Modal>

      <div className="app__header">
        
        <img
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="">
        </img>
        
        {user? (
         <Button onClick={()=> auth.signOut()}> Logout</Button>
      )
      :
      (
        <div className="app__loginContainer" >
           <Button onClick={()=> setOpenSignIn(true)}> Sign In</Button>
          <Button onClick={()=> setOpen(true)}> Sign Up</Button>
        </div>
      )
      }
      </div>
      <div className="app__posts">
        <div className="app__postsLeft">
          {
            posts.map(({id, post})=>(
              <Post key={id} postId={id} user={user} username = {post.username} caption ={post.caption} imageUrl={post.imageUrl}/>
            ))
          }
          </div>
     
      <div className="app__postsRight">

      <InstagramEmbed
            url="https://www.instagram.com/p/B_uf9dmAGPw/"
            maxWidth={320}
            hideCaption={false}
            containerTagName="div"
            protocol=""
            injectScript
            onLoading={() => {}}
            onSuccess={() => {}}
            onAfterRender={() => {}}
            onFailure={() => {}}
          />
        </div>
        </div>
      
     { user?.displayName ?
      (
         <ImageUpload username={user.displayName}/>
      )
      :
      (  <h3> Login to upload </h3> )
       
      }
      {/** Post */}
    </div>
  );
}

export default App;
