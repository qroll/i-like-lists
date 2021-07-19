import 'styled-components'
import { AppTheme } from './AppTheme';

declare module 'styled-components' {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface DefaultTheme extends AppTheme { }
}

declare module 'system-props' {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface Theme extends AppTheme { }
}
