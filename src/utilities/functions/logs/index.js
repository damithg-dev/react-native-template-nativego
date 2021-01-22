import React from "react";
import { FileLogger , LogLevel} from "react-native-file-logger";
import Config from "react-native-config";

export const log = (msg) => {
    switch (Config.LogLevel){
        case 'debug':
            console.log('🛑 🛑 🛑 🛑 🛑 🛑' , JSON.stringify(msg));
        return;
        case '':
        FileLogger.write(LogLevel.Info, msg)
        return;
    }
   
}