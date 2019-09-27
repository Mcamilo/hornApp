import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
// import { IonicModule } from 'ionic-angular';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the LancamentoAdminPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lancamento-admin',
  templateUrl: 'lancamento-admin.html',
})
export class LancamentoAdminPage {
  public form 	: FormGroup;

  // myDate: String = new Date().toISOString();

  // profile : {} = {};
  username = '';

  lancamento = {
    username:'',
    usuario:'',
    acao:'',
    fazenda:'',
    animal:'',
    quantidade:'',
    data:'',
    info:''
  };
  transferencia = {
    username:'',
    local_origem:'',
    usuario_origem:'',
    fazenda_origem:'',
    usuario_destino:'',
    fazenda_destino:'',
    local_destino:'',
    animal_transf:'',
    quantidade_transf:'',
    data_transf:'',
    info_transf:''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private alertCtrl: AlertController, public fsp: FirebaseServiceProvider,
    private _FB          : FormBuilder,private storage: Storage) {

    this.lancamento.username = this.username;
    this.transferencia.username = this.username;
    // this.profile = this.fsp.profile;
    this.form = this._FB.group({
      acao: ['', Validators.required],
      fazenda: ['', Validators.required],
      quantidade: ['', Validators.required],
      myDate: ['', Validators.required],
      info: ['', Validators.required],
      animal       	  : ['', Validators.required],
      usuario:['', Validators.required],
      local_origem:['', Validators.required],
      usuario_origem:['', Validators.required],
      fazenda_origem:['', Validators.required],
      usuario_destino:['', Validators.required],
      fazenda_destino:['', Validators.required],
      local_destino:['', Validators.required],
      animal_transf:['', Validators.required],
      quantidade_transf:['', Validators.required],
      data_transf:['', Validators.required],
      info_transf:['', Validators.required],

      technologies     : this._FB.array([
         this.initTechnologyFields()
      ])
   });
  }
  selectV: any;

  regular:boolean = false;
  transf: boolean = false;
  onChange(value: any) {
    // console.log("VALUE"+value);
    this.selectV = value;
    if (value === 'Transferencia') {
      this.regular = false;
      this.transf = true;
    }else if(value === undefined){
      this.regular = false;
      this.transf = false;
    }
    else{
      this.regular = true;
      this.transf = false;
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LancamentoAdminPage');
    this.storage.get('username').then((val) => {
      this.username = val;
    });
  }

  popView(){
     this.navCtrl.pop();
   }

  initTechnologyFields() : FormGroup{
    return this._FB.group({
       animal : ['', Validators.required],
       quantidade: ['', Validators.required]
    });
  }
  addNewInputField() : void{
   const control = <FormArray>this.form.controls.technologies;
   control.push(this.initTechnologyFields());
 }
 removeInputField(i : number) : void{
   const control = <FormArray>this.form.controls.technologies;
   control.removeAt(i);
}
  manage(val : any) : void{

    if(this.transf){

      this.transferencia.local_origem = val.local_origem;
      this.transferencia.usuario_origem = val.usuario_origem;
      this.transferencia.fazenda_origem = val.fazenda_origem;
      this.transferencia.usuario_destino = val.usuario_destino;
      this.transferencia.fazenda_destino = val.fazenda_destino;
      this.transferencia.local_destino = val.local_destino;
      this.transferencia.animal_transf = val.animal_transf;
      this.transferencia.quantidade_transf = val.quantidade_transf;
      this.transferencia.data_transf = val.data_transf;
      this.transferencia.info_transf = val.info_transf;
      this.fsp.pushFireStoreBalancoTransfAdmin(this.transferencia);

    }else{
      this.lancamento.acao = val.acao;
      this.lancamento.fazenda = val.fazenda;
      this.lancamento.usuario = val.usuario;
      this.lancamento.data = val.myDate;
      this.lancamento.info = val.info;
      val.technologies.forEach(function (item) {
       this.lancamento.animal = item.animal;
       this.lancamento.quantidade = item.quantidade
       this.fsp.pushFireStoreBalancoAdmin(this.lancamento);
     }, this);

    }
    // let alert = this.alertCtrl.create({
    //     title: 'Sucesso',
    //     message: 'Registro Salvo com Sucesso',
    //     buttons: ['OK']
    //   });
    //   alert.present();
      this.navCtrl.pop();
  }
}
