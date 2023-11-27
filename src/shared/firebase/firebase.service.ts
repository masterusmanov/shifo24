import { Injectable, OnModuleInit } from '@nestjs/common';
import { DeleteUserFirebaseDto, EditFirebaseDto } from './firebase.dto';
import * as firebaseAdmin from 'firebase-admin';
import * as serviceAccount from './service-account-key.json';

@Injectable()
export class FirebaseService implements OnModuleInit {
  private firebase;
  private db;
  onModuleInit() {
    this.firebase = firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert(
        serviceAccount as firebaseAdmin.ServiceAccount,
      ),
    });
    this.db = this.firebase.firestore();
  }

  async deleteUserFirebase(params: DeleteUserFirebaseDto) {
    const doc = this.db.collection('users').doc(params.firebase_id);

    await doc.delete().catch((error) => {
      return {
        success: error?.message,
      };
    });
  }

  async updateUserFirebase(id: string, params) {
    const doc = this.db.collection('users').doc(id);

    await doc.update(params).catch((error) => {
      return {
        success: error?.message,
      };
    });
  }
}
