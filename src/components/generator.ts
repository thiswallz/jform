import {exec} from 'child_process';

export const execute = (folder: string) => {
  return {
    component: (name: string) => {
      exec(
        `npm run plop component ${name} "${folder}"`,
        (err, stdout, stderr) => {
          if (err) {
            console.log(`Error trying to execute command, ${err}`);
            return;
          }
          return stdout;
        },
      );
    },
  };
};
