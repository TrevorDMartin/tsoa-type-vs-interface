import { HttpStatusCode } from '@src/utility/HttpStatusCode';
import { Controller, Get, Route } from 'tsoa';
import {
    type RgmViewData,
    mockRgmViewData
} from './MockData';

@Route('/web/rgm-view')
class WebRgmViewController extends Controller {
    @Get('data')
    public getData(): RgmViewData {
        this.setStatus(HttpStatusCode.Ok);
        return mockRgmViewData;
    }
}

export { WebRgmViewController };
