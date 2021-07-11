import 'styled-components'
import '@xstyled/system'
import {
    ITheme,
    DefaultTheme as XStyledDefaultTheme,
} from '@xstyled/styled-components'

interface AppTheme extends ITheme, XStyledDefaultTheme {
    space: {
        0: string,
        xxs: string,
        xs: string,
        s: string,
        m: string,
        l: string,
        xl: string,
        "2xl": string,
        "3xl": string,
    }
}

declare module '@xstyled/system' {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface Theme extends AppTheme { }
}
declare module 'styled-components' {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface DefaultTheme extends AppTheme { }
}