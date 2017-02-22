/**
 * Created by user on 2/18/2017.
 */
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'bad5313f'
  }
};

@NgModule({
  declarations: [],
  imports: [
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [],
  providers: []
})
export class AppModule {}
