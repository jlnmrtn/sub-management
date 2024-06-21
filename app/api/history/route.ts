import {
    AthenaClient,
    StartQueryExecutionCommand,
    GetQueryExecutionCommand,
    QueryExecutionState,
    GetQueryResultsCommand,
    QueryExecution
  } from '@aws-sdk/client-athena'
  import { runWithAmplifyServerContext } from "@/utils/amplifyServerUtils";
  import { cookies } from "next/headers";
  import { fetchAuthSession } from "aws-amplify/auth/server";
import { NextResponse } from 'next/server';

export const runtime = "edge";

function mapData(data: any) {
  const mappedData: any= [];

  const columns = data.Rows[0].Data.map((column:any) => {
    return column.VarCharValue;
  });

  data.Rows.forEach((item:any, i:number) => {
    if (i === 0) {
      return;
    }

    const mappedObject = {};
    item.Data.forEach((value:any, i:number) => {
      if (value.VarCharValue) {
        mappedObject[columns[i]] = value.VarCharValue;
      } else {
        mappedObject[columns[i]] = '';
      }
    });

    mappedData.push(mappedObject);
  });

  return mappedData;
}

  
  export async function GET(req: Request) {
    const user = await runWithAmplifyServerContext({
      nextServerContext: { cookies },
      operation: (contextSpec) => fetchAuthSession(contextSpec),
    });

    console.log(user.credentials)

    const athena = new AthenaClient({
        credentials: user.credentials,
        region: "us-east-1",
    });

    const query = "select * from garnetdb.notifications"

    const params = {
        QueryString: query, 
        
        WorkGroup: 'primary',
        ResultConfiguration : {
          OutputLocation: 's3://garnet-datalake-us-east-1-xxxxxxx-athena-results/'
        },
        ResultReuseConfiguration:{
          ResultReuseByAgeConfiguration: {
             Enabled: true,
          }
        }
      };
      
      const startQueryExecution = await athena.send(new StartQueryExecutionCommand(params));
      const command = new GetQueryExecutionCommand({QueryExecutionId: startQueryExecution.QueryExecutionId} );
      const response = await athena.send(command);
    
      let retryIn = 0;
      let queryExecution: QueryExecution;
      do {
        // The query runs asynchronously so wait a bit before checking the result up to 1s per retry
        if (retryIn < 1000) {
          retryIn += 250;
        }
        await setTimeout(()=> retryIn);
    
        const getQueryExecutionOutput = await  athena.send(new GetQueryExecutionCommand({QueryExecutionId: startQueryExecution.QueryExecutionId}));
        queryExecution = getQueryExecutionOutput.QueryExecution!;
      } while (
        queryExecution.Status!.State === QueryExecutionState.QUEUED ||
        queryExecution.Status!.State === QueryExecutionState.RUNNING
      );
    
      const getQueryResultsCommand = new GetQueryResultsCommand({
        QueryExecutionId: queryExecution.QueryExecutionId
      });
    
      const queryResults = await athena.send(getQueryResultsCommand);

    return new NextResponse(JSON.stringify(mapData(queryResults.ResultSet)))
  }
  