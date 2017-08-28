import {
  Component, OnInit
} from '@angular/core';
import {Router} from '@angular/router';
import {
  CreateEthContractForm,
  EthContractDeployService,
} from './aces-service/eth-contract-deploy.service';
import {ServiceInfo} from '../common/service-info';

@Component({
  selector: 'app-eth-contract-deploy',
  templateUrl: './eth-contract-deploy.component.html'
})
export class EthContractDeployComponent implements OnInit {

  serviceInfoLoading = true;
  serviceInfo: ServiceInfo;
  model = new CreateEthContractForm();
  submitted = false;
  error = false;

  constructor(private router: Router, private ethContractDeployService: EthContractDeployService) {}

  ngOnInit() {
    this.ethContractDeployService.getServiceInfo().subscribe(serviceInfo => {
      this.serviceInfo = serviceInfo;
      setTimeout(() => this.serviceInfoLoading = false, 1000);
    });
  }

  onSubmit() {
    this.submitted = true;

    this.ethContractDeployService.create(this.model)
      .subscribe(
        contractResponse => {
          this.router.navigate(['eth-contract-deploy-contracts', contractResponse.token]);
        },
        error => {
          console.log(error);
          this.error = true;
          this.submitted = false;
        }
      );
  }

}
