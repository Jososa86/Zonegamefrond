import { Component } from 'react';
import { UserService } from './service/UserService';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Menubar } from 'primereact/menubar';
//import { Password } from 'primereact/password';

import 'primereact/resources/themes/nova/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


//funcion principal
export default class IniciarSesion extends Component{
  constructor(){
    super();
    this.state = {
      visible : false,
      user: {
        email: null,
        password: null
      }
  }

//icono de iniciar sesion con funcion
    this.items = [
      {
        label:'Iniciar sesion',
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

  //metodo guardar
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

  //funcion que devuelve
  render(){
    return (
      <div style={{width:'80%', marginTop: '20px', margin:'0 auto'}}>
        <br />
        <Menubar model={this.items} style={{width:'22%', marginTop: '20px', margin:'0 auto'}}></Menubar>
        <br />
        <Dialog header="Iniciar Sesión" visible={this.state.visible} style={{width: '400px'}} footer={this.footer} modal={true} onHide={() => this.setState({visible: false})}>
              <form id='user-form'>
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
            </form>
          </Dialog>
          <Toast ref={Toast} />
     </div>
    )
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


