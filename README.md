# ts-cron-validator
A TypeScript type level CRON expression validator!

![VSCode screenshot!](https://raw.githubusercontent.com/alexvictoor/ts-cron/main/screenshot.png)

Expressions supported are the one generated and describe on [crontab.guru](https://crontab.guru) website. This means that you can use this library to check standard CRON expressions but also non standard one. 
Also, this type level validator works quite well in conjunction with cron engines such as [node-cron](https://github.com/kelektiv/node-cron).

## Usage
To install this tiny library: 
```
  
  npm install ts-cron-validator

```

Then you have the choice between two helper functions:
- validStandardCronExpression() if you use a scheduler that understands only standard CRON expressions.
- validCronExpression() if you use a scheduler that also understands non standard expressions.  

Below some examples that show how to use those two helpers:
```
import { validCronExpression, validStandardCronExpression } from 'ts-cron-validator';

validStandardCronExpression('0 3 * * * ');      // OK padding accepted
validStandardCronExpression('42 * * *   ');     // KO missing day of week part
validStandardCronExpression('59 4 * * *');      // OK
validStandardCronExpression('60 4 * * *');      // KO incorrect minutes part 

validCronExpression('20 60 4 * dec mon');       // OK non standard CRON expression are accepted
                                                // by validCronExpression()
```