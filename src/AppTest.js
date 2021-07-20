import React, {useEffect, useState} from 'react';
import firebase from "firebase";
import Landing from "./pages/Landing/Landing";
import Footer from "./pages/Landing/footer/footer";
import {fire} from "./firebase/Firebase";
import {
    createNewUser,
    getCollectionWhereKeyValue,
} from "./help/helper";
import HeaderTest from "./pages/Landing/header/HeaderTest";
import AppToolTest from "./pages/App/AppToolTest";
import ParticlesLib from "./components/particles/Particles";

const AppTest = () => {

    /************************************************
     *state
     ************************************************/
    const [showLanding, setShowLanding] = useState(true);
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState();
    const [currentUserId, setCurrentUserId] = useState();
    const [account, setAccount] = useState({});
    const [loading, setLoading] = useState(false)

    /************************************************
     *set account in document
     ************************************************/

    useEffect(() => {
        getCurrentIdPost()
        // getUser()
    }, [currentUser, account, currentUserId])
    const loadFunction = () => {
        setLoading(!loading);
    }
    const loadFunction2 = () => {
        getCollectionWhereKeyValue('users', 'uid_firebase', localStorage.getItem('crypto__uid')).then(r => {
            // console.log(r[0].idPost === currentUser[0].idPost)
            if (r[0]) {
                setCurrentUser(r)
                // console.log(currentUser)
                setLoading(false)
                setShowLanding(!showLanding)
                // if(currentUser === undefined){
                //     getUser();
                //     console.log(currentUser)
                // }
                // if(currentUser[0]){
                //     // console.log(r[0])
                //     console.log(currentUser)
                //     setLoading(false)
                //     setShowLanding(!showLanding)
                // }
            }
        })
    }
    useEffect(() => {
    }, [currentUser])


    useEffect(() => {
        const unregisterAuthObserver = fire.auth().onAuthStateChanged(user => {
            setIsSignedIn(!user);
            if (user) {
                localStorage.setItem('crypto__uid', user.uid);
                createNewUser(user, getUser).then(() => {
                    getUser();
                    loadFunction2();
                });
                getUser();
                loadFunction2();
                // setLoading(!loading)
                // setShowLanding(!showLanding)
                // console.log(currentUser)
            }
        });
        return () => unregisterAuthObserver();
    }, []);

    const getCurrentIdPost = () => {
        if (!!currentUser) {
            setCurrentUserId(currentUser[0]?.idPost)
        }
    }
    const getUser = () => {
        getCollectionWhereKeyValue('users', 'uid_firebase', localStorage.getItem('crypto__uid')).then(r => {
            setCurrentUser(r)
        }).catch(e => {
            console.log(e)
        })
    }
    /************************************************
     * handle
     ************************************************/
    const handleSign = () => {
        setIsSignedIn(!isSignedIn);
    }
    // const handleLoading = ()=>{
    //     setLoading(!loading)
    // }
    const handleLoadingFalse = () => {
        setLoading(false)
    }
    const handleLoadingTrue = () => {
        setLoading(true)
    }
    const handleLanding = () =>{
        setShowLanding(!showLanding)
    }
    /************************************************
     *Render
     ************************************************/
    return (
        <div className={loading ? "body__container" : ''}>
            {loading && <div className="loader-bg">
                <div className="loader-p">
                </div>
            </div>}
            <ParticlesLib/>
            <HeaderTest
                isSignedIn={isSignedIn}
                showLanding={() => setShowLanding(!showLanding)}
                handleSign={() => handleSign()}
                getUser={() => getUser()}
                loadFunction={() => loadFunction()}
                loadFunction2={() => loadFunction2()}
            />
            {showLanding ?
                <>
                    <Landing/>
                    <Footer/>
                </>
                :
                <>
                    <AppToolTest
                        handleLanding={handleLanding}
                        handleLoadingFalse={handleLoadingFalse}
                        handleLoadingTrue={handleLoadingTrue}
                        setIsSignedIn={setIsSignedIn} isSignedIn={isSignedIn} currentUserId={currentUserId}
                        getUser={getUser} user={currentUser} account={account}
                    />
                </>
            }
        </div>
    );
};

export default AppTest;