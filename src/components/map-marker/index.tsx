import { MarkerIcon } from '@/types/type';

function MapMarker({ name, requests }: MarkerIcon) {
  return `
    <div style="
      display: inline-flex;
      height: 1.375rem;
      padding: 0.425rem;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      flex-shrink: 0;
      border-radius: 1.875rem;
      border: 1px solid var(--MainColor, #5776B9);
      background: var(--BG, #FFF);
    ">
      <div style="
          position: absolute;
          top: -0.375rem;
          right: -0.375rem;
          display: inline-flex;
          padding: 0rem 0.3125rem;
          justify-content: center;
          align-items: center;
          gap: 0.625rem;
          border-radius: 1.25rem;
          background: var(--Main2, #FFB800);
          box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.10);
      ">
          <div style="
              color: var(--SubColor, var(--BG, #FFF));
              font-family: 'Noto Sans KR';
              font-size: 0.625rem;
              font-style: normal;
              font-weight: 400;
              line-height: normal;
          ">
              +${requests} 
          </div>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="12" fill="#5776B9"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M16.3678 6.81951C18.7798 9.25175 18.7798 13.1737 16.3678 15.606L12.0001 20.0001L7.63247 15.6069C5.22049 13.1746 5.22049 9.25263 7.63247 6.82039C8.78733 5.65551 10.3596 5.00017 11.9999 5C13.6403 4.99983 15.2127 5.65486 16.3678 6.81951Z" fill="white" stroke="#5776B9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M14.4707 10.8337C14.4546 12.1943 13.3415 13.2857 11.9809 13.2751C10.6203 13.2644 9.5244 12.1556 9.52968 10.795C9.53496 9.43434 10.6394 8.33408 12.0001 8.33398C13.3725 8.34224 14.4785 9.46127 14.4707 10.8337Z" fill="white" stroke="#5776B9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <div style="
        color: var(--MainText, #1F1F1F);
        font-family: 'Noto Sans KR';
        font-size: 0.75rem;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        letter-spacing: -0.01875rem;
      ">
        ${name}
      </div>
    </div>
    `;
}

export default MapMarker;
