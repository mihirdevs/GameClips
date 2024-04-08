import { Injectable } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import IUser from '../models/user.model';
import { Observable, delay, map, filter, switchMap, of } from 'rxjs';
import { Router } from '@angular/router';
import { ActivatedRoute, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userCollection:AngularFirestoreCollection<IUser>
  public isAuthenticated$: Observable<boolean>
  public isAuthenticatedWithDelay$: Observable<boolean>
  public redirect : boolean = false;
  constructor(
    private auth : AngularFireAuth,
    private db: AngularFirestore,
    private router: Router,
    private route: ActivatedRoute)
  {
    this.userCollection = db.collection('users')
    this.isAuthenticated$ = auth.user.pipe(
      map(user=> !!user)
    )
    this.isAuthenticatedWithDelay$ = this.isAuthenticated$.pipe(
      delay(2000)
    )

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(event => this.route.firstChild),
      switchMap(route => route?.data ?? of({authOnly:false}))
    ).subscribe((data)=>{
      this.redirect = data.authOnly ?? false;
    });
  }

  public async createUser(userData : IUser){

    if(!userData.password){
      throw new Error("Password is required!")
    }
    const userCredential = await this.auth.createUserWithEmailAndPassword(
      userData.email as string, userData.password as string
  );  
  if(!userCredential.user){
    throw new Error("User not found")
  }
  await this.userCollection.doc(userCredential.user.uid).set({
    name:userData.name,
    email :userData.email,
    age:userData.age,
    phone:userData.phone
   });

   await userCredential.user.updateProfile({
    displayName : userData.name
   })
   
  }
  
  public async logout($event:Event){
    if($event){
      $event.preventDefault()
    }

    await this.auth.signOut()
    if(this.redirect){
      await this.router.navigateByUrl("/")
    }
  }
}
