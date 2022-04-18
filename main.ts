import { Construct } from "constructs";
import { App, TerraformStack , TerraformOutput} from "cdktf";
import { AwsProvider, ec2 } from "@cdktf/provider-aws";

class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new AwsProvider(this, "aws", {
      region: "us-west-1",
    });

    const instance = new ec2.Instance(this, "compute", {
      ami: "ami-01456a894f71116f2",
      instanceType: "t2.micro",
      tags:{
        Name: "TypeScript-Demo"
      }
    });

    new TerraformOutput(this, "public_ip", {
      value: instance.publicIp,
    });
  }
}

const app = new App();
new MyStack(app, "cdktf-typescript");
app.synth();
