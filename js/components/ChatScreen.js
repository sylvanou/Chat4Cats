import $ from 'jquery';
import * as firebase from 'firebase';
import { messages, users } from '../main';
import { LoginScreen } from './LoginScreen';

export const online = (user, catImg) => {
  // console.log('online');
  showTyping(user);
  
  let userdata = users.child(user.uid);
  userdata.set({
    id: user.uid,
    date: (new Date()).toString(),
    name: user.displayName,
    email: user.email,
    img: catImg,
    typing: false
  });
}



export const showTyping = (user) => {
  users.on('child_changed', function(snapshot) {
    let person = snapshot.val();
    let id = "#" + person.id;

    if (person.typing && !$(id).html()) {
      $("#messages").append(
        `<div id=${person.id} style="font-size: 12px;">
        ${person.name || person.email.split('@')[0] } is typing ...
        </div>`
      );
      scroll();
    }
    else {
      $(id).remove();
    }
  });
}

export const offline = (id) => {
  let obj = {};
  obj[id] = null;
  users.update(obj);
}

export const isTyping = (id) => {
  let obj ={};
  if ($('#input_msg').val()) {
    obj[id + '/typing'] = true;
    users.update(obj);
  }
  else {
    obj[id + '/typing'] = false;
    users.update(obj);
  }
}

export const ChatScreen = (user) => {
  let container = document.createElement('div');

  $(container).html(`
      <div id="chat_screen" class="chat-container">
        <div class="chat-header">
          <div class="name-container">          
Hi ${ user.displayName === null ? user.email.split('@')[0] : user.displayName.split(' ')[0]}!
          </div>
          <div id="online" class="online"><ul>Online</ul></div>
          <div id="sign_out" class="sign-out">
            <span class="ion-log-out"></span>
          </div>
        </div>

        <div id="messages" class="chat-messages">
          Messages go here
        </div>

        <div class="chat-input-container">
          <div class="chat-input-wrapper">
            <input id="input_msg" class="chat-input" type="text" />
          </div>
          <div id="chat_btn" class="chat-btn">
            <span class="ion-android-send"></span>
          </div>
        </div>

      </div>
      `);

  return container;
};

export const sendMessage = (uid, name, email, img) => {
  let date = new Date();
  let text = $("#input_msg").val();

  // console.log('sending message ', text);

  if ($("#input_msg").val()) {
    messages.push({
      uid: uid,
      name: name,
      text: $("#input_msg").val(),
      date: date.toString(),
      email: email,
      img: img
    });
    $("#input_msg").val('');
  }
}

export const scroll = () => $('#messages').scrollTop($('#messages')[0].scrollHeight);

export const chatScreenEvents = function (user, catImg) {

  $('#chat_btn').on('click', function(){
    sendMessage(user.uid, (user.displayName === null ?  user.email.split('@')[0] : user.displayName.split(' ')[0]), user.email, catImg);
  });

  $('#input_msg').keypress(function (e) {
    if (e.keyCode === 13) {
      sendMessage(user.uid, (user.displayName === null ?  user.email.split('@')[0] : user.displayName.split(' ')[0]), user.email, catImg);
    }
  }).keyup(function () {
    isTyping(user.uid);
  });

  getAllMessages(user);
  
  $('#online').click(function() {
    console.log('online clicked');
  })

  $('#sign_out').click(function() {
    offline(user.uid);
    firebase.auth().signOut().then(function () {
      // Sign-out successful.
      // console.log('signed out');

      $('#chat_screen').fadeOut("slow", function () {
        $('#root').html(LoginScreen());
      });
    }).catch(function (error) {
      // An error happened.
      // console.log('error ', error);
      alert('can not sign out');
    });
  });
}

export const getAllMessages = (user) => {
  messages.on('value', function (snapshot) {
    //console.log(snapshot.val());
    $("#messages").html("");
    let msgs = snapshot.val();

    for (let id in msgs) {
      let msg = msgs[id];
      let side = user.email === msg.email ? 'right' : 'left';
      let margin = user.email === msg.email ? 'margin-left: 15px;' : 'margin-right: 15px;';
      let corner = user.email === msg.email ? 'right-top' : 'left-top'

      $("#messages").append(
        `<div class="msg-div ${side}">
            <div style="${margin}">
              <img class="profile-img" src="${msg.img}" height="40" width="auto" />
            </div>
            <div style="flex-grow: 1; padding: 10px;" class="talk-bubble tri-right ${corner}">
              <div class="name"><strong>${msg.name}</strong>:</div>
              <div class="msg">${msg.text}</div>
              <div class="date ${side}">
                <div>${format.date(new Date(msg.date)).date}</div>
                <div>${format.date(new Date(msg.date)).time}</div>
              </div>
            </div>
         </div>`
      );
    }
    scroll();
  });
}

export let format = {
  date: (date) => {
    let d = date.getDate();
    let m = date.getMonth() + 1;
    let y = date.getFullYear();

    let h = date.getHours();

    let hf = (h > 11) ? 'PM' : 'AM';
    let hh = (h > 12) ? h % 12 : h;
    let mm = date.getMinutes();
    let ss = date.getSeconds();

    if (d < 10) d = '0' + d;
    if (m < 10) m = '0' + m;
    if (hh < 10) hh = '0' + hh;
    if (mm < 10) mm = '0' + mm;
    if (ss < 10) ss = '0' + ss;

    return { 
      date: m + '/' + d + '/' + y, 
      time: hh + ':' + mm + ':' + ss + ' ' + hf 
    };
  }
}

window.onbeforeunload = function (e) {
  if(user){
    offline(user.uid);
  }
};





