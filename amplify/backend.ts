import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { ManagedPolicy } from 'aws-cdk-lib/aws-iam';


/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({
  auth,
});

backend.auth.resources.authenticatedUserIamRole.addManagedPolicy(ManagedPolicy.fromAwsManagedPolicyName('AmazonBedrockFullAccess'))
backend.auth.resources.authenticatedUserIamRole.addManagedPolicy(ManagedPolicy.fromAwsManagedPolicyName('AWSIoTFullAccess'))
backend.auth.resources.authenticatedUserIamRole.addManagedPolicy(ManagedPolicy.fromAwsManagedPolicyName('AmazonAthenaFullAccess'))
backend.auth.resources.authenticatedUserIamRole.addManagedPolicy(ManagedPolicy.fromAwsManagedPolicyName('AmazonS3FullAccess'))


const { cfnIdentityPool } = backend.auth.resources.cfnResources;
cfnIdentityPool.allowUnauthenticatedIdentities = false;