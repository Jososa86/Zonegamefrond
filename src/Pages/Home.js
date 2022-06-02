import { Component } from 'react';
import './App.css';
import { UserService } from './service/UserService';
import {DataTable} from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Panel } from 'primereact/panel';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Password } from 'primereact/password';
import { InputMask } from 'primereact/inputmask';

import 'primereact/resources/themes/nova/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export default class App extends Component{
  constructor(){
    super();
    this.state = {
      visible : false,
      user: {
        id: null,
        name: null,
        email: null,
        telephone: null,
        password: null
      },
      selectUser : {

      }
  }

    this.items = [
      {
      label:'Registrar usuario',
      icon:'pi pi-user-plus',
      command : () => {this.showSaveDialog()}
      },
      {
        label:'Iniciar sesión',
       icon:'pi pi-user-edit',
       command : () => {this.showLoginDialog()}
      },
    ];

    this.userService = new UserService(); 
    this.save = this.save.bind(this);
    this.footer = (
      <div>
      <Button label='Guardar' icon='pi pi-check' onClick={this.save} />
      </div>
    );

  }

  componentDidMount(){
    this.userService.getAll().then(data => this.setState({users: data}));
  }

  save (){
    this.userService.save(this.state.user).then(data =>{
      this.setState({
        visible: false,
        user: {
          id: null,
          name: null,
          email: null,
          telephone: null,
          password: null
      }      
      });
      Toast.current.show({severity: 'success', summary: '¡Atencion!', detail: 'Usuario Guardado'});
      this.userService.getAll().then(data => this.setState({users: data}));
    })
  }

  render(){
    return (
      <div style={{width:'80%', marginTop: '20px', margin:'0 auto'}}>
        <Menubar model={this.items}></Menubar>
        <br></br>
        <Dialog header="Registrar Usuario" visible={this.state.visible} style={{width: '400px'}} footer={this.footer} modal={true} onHide={() => this.setState({visible: false})}>
              <form id='user-form'>
              <span className='p-float-label'>
              <InputText value={this.state.user.name} style={{width:'100%'}} id="name" onChange={(e) => {
                  let val =  e.target.value;
                  this.setState(prevState =>{
                  let user = Object.assign({}, prevState.user)
                  user.name = val

                  return {user};
                })}
              } />
              <label htmlFor='name'>Nombre</label>
              </span>
              <br/>
              <span className='p-float-label'>
              <InputText value={this.state.user.email} style={{width:'100%'}} id="email" onChange={(e) => {
                let val =  e.target.value;
                this.setState(prevState =>{
                let user = Object.assign({}, prevState.user)
                user.email = val

                return {user};
              })}
            } />
              <label htmlFor='email'>Email</label>
              </span>
              <br/>
              <span className='p-float-label'>
              <InputMask value={this.state.user.telephone} mask='9999999999' style={{width:'100%'}} id="telephone" onChange={(e) => {
                let val =  e.target.value;
                this.setState(prevState =>{
                let user = Object.assign({}, prevState.user)
                user.telephone = val

                return {user};
              })} 
            }/>
              <label htmlFor='telephone'>Telefono</label>
              </span>
              <br/>
              <span className='p-float-label'>
              <Password value={this.state.user.password} style={{width:'100%'}}  id="password" onChange={(e) => {
                let val =  e.target.value;
                this.setState(prevState =>{
                let user = Object.assign({}, prevState.user)
                user.password = val

                return {user};
              })} 
            }
            />
              <label htmlFor='password'>Contraseña</label>
              </span>
            </form>
          </Dialog>
          <Toast ref={Toast} />
     </div>
    )
  }

  showSaveDialog(){
    this.setState({
      visible : true,
      user : {
        id: null,
        name: null,
        email: null,
        telephone: null,
        password: null
      }
    });
    document.getElementById('persona-form').reset();
  }
    showLoginDialog(){
      this.setState({
        visible: true,
        userLogin:{
          email: null,
          password: null
        }
      })
    }
}


