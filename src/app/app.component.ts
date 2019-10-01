import {AfterContentInit, Component, OnDestroy} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SubSink} from 'subsink';
import { default as Modeler } from 'bpmn-js/lib/Modeler';
import PropertiesPanelModule from 'bpmn-js-properties-panel';
import PropertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda';
// @ts-ignore
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentInit, OnDestroy {
  private camundaURL = 'http://localhost:8080/engine-rest';
  private modeler: Modeler;
  private subs = new SubSink();
  private deploymentId: string;
  private modelerProperties = {
    container: '#container',
    propertiesPanel: {
      parent: '#properties'
    },
    additionalModules: [
      PropertiesPanelModule,
      PropertiesProviderModule
    ],
    moddleExtensions: {
      camunda: camundaModdleDescriptor
    }
  };

  constructor(private http: HttpClient) {}

  ngAfterContentInit() {
    this.modeler = new Modeler(this.modelerProperties);
    this.newModel();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
    this.modeler.destroy();
  }

  newModel() {
    this.modeler.createDiagram();
  }

  loadExampleModel() {
    this.loadFile('assets/pretzels.bpmn');
  }

  private loadFile(url: string) {
    this.subs.add(
      this.http.get(url, {
        headers: { observe: 'response' },
        responseType: 'text'
      }).subscribe( response => {
        this.modeler.importXML(response);
      })
    );
  }

  deploy() {
    this.modeler.saveXML({ format: true }, (err, xml) => {
      const formData = new FormData();
      formData.append('data', new Blob([xml]), 'test-web-deploy.bpmn');
      formData.append('deployment-name', 'test deployment from website');
      formData.append('deployment-source', 'local app');
      formData.append('deploy-changed-only', 'true');
      this.subs.add(
        this.http.post(`${this.camundaURL}/deployment/create`, formData).subscribe((response: any) => {
          console.log('finished the attempt to deploy', response);
          this.deploymentId = response.id;
        })
      );
    });
  }

  getProcessDefinitions() {
    if (this.deploymentId) {
      this.subs.add(
        this.http.get(`${this.camundaURL}/process-definition?deploymentId=${this.deploymentId}`).subscribe(response => {
          console.log(`grabbed a list of process definitions with deployment ID: ${this.deploymentId}`, response);
        })
      );
    } else {
      console.error('no deployment id set');
    }
  }
}
