import { Component } from 'react';
import './App.css';
import { UserService } from './service/UserService';
//import {DataTable} from 'primereact/datatable';
//import { Column } from 'primereact/column';
//import { Panel } from 'primereact/panel';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { InputMask } from 'primereact/inputmask';
//import { Password } from 'primereact/password';
import { Menubar } from 'primereact/menubar';


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
        password: null,
        edad: null
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
    ];
    this.items1 = [
      {
        label:'Iniciar sesion',
       icon:'pi pi-user-edit',
       command : () => {this.showLoginDialog()}
      },
    ];
    this.userService = new UserService();
    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
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
          password: null,
          edad: null,
      },
      User: {
        email: null,
        password: null
      }
      });
      Toast.current.show({severity: 'success', summary: '¡Atencion!', detail: 'Usuario Guardado'});
      this.userService.getAll().then(data => this.setState({users: data}));
    })
  }

  delete(){
    if(window.confirm("¿Desea borrar el registro?")){
      this.userService.delete(this.state.selectUser.id).then(data =>{
        Toast.current.show({severity: 'success', summary: '¡Atencion!', detail: 'Usuario Eliminado'})
        this.userService.getAllUser().then(data => this.setState({users: data}))
      });
    }
  }


  render(){
    return (
      <div style={{width:'80%', marginTop: '20px', margin:'0 auto'}}>
        <br />
        <br />
        <br />
        <br />
        <Menubar model={this.items} style={{width:'22%', marginTop: '20px', margin:'0 auto'}}></Menubar>
        <br />
        <Menubar model={this.items1} style={{width:'22%', marginTop: '20px', margin:'0 auto'}}></Menubar>
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
              <InputText value={this.state.user.email} style={{width:'100%'}} id="email" type='email' onChange={(e) => {
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
              <InputText value={this.state.user.password} style={{width:'100%'}}  id="password" onChange={(e) => {
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
              <br/>
              <span className='p-float-label'>
              <InputText value={this.state.user.edad} style={{width:'100%'}}  id="edad" onChange={(e) => {
                let val =  e.target.value;
                this.setState(prevState =>{
                let user = Object.assign({}, prevState.user)
                user.edad = val
                return {user};
                })} 
              }
              />
              <label htmlFor='edad'>Ingresar edad</label>
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
        password: null,
        edad: null
      }
    });
    document.getElementById('persona-fomr').reset();
  }

  showLoginDialog(){
    this.setState({
      visible: true,
      user : {
        email: null,
        password: null,
        telephone: null
      }
    })
  }
}



