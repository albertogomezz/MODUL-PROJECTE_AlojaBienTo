import React from 'react';
import FooterCSS from  './Footer.module.css';
import { useNavigate } from "react-router-dom";
import github from '../../assets/github-color.svg';
import { useTranslation } from "react-i18next";

export default function Header() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    
    return (
        // <h1>hola</h1>
        <div className={FooterCSS.footer}>
        <div className={FooterCSS.contain}>
        <div className={FooterCSS.col}>
          <h1>{t('footer.titles.company')}</h1>
          <ul>
            <li>About</li>
          </ul>
        </div>
        <div className={FooterCSS.col}>
          <h1>{t('footer.titles.products')}</h1>
          <ul>
            <li>{t('footer.subtitles.products')}</li>
          </ul>
        </div>
        <div className={FooterCSS.col}>
          <h1>{t('footer.titles.accounts')}</h1>
          <ul>
            <li>{t('footer.subtitles.myAccount')}</li>
          </ul>
        </div>
        <div className={FooterCSS.col}>
          <h1>{t('footer.titles.resources')}</h1>
          <ul>
            <li>{t('footer.subtitles.webMail')}</li>
            <li>{t('footer.subtitles.siteMap')}</li>
          </ul>
        </div>
        <div className={FooterCSS.col}>
          <h1>{t('footer.titles.support')}</h1>
          <ul>
            <li>{t('footer.subtitles.contactUs')}</li>
            <li>{t('footer.subtitles.openTicket')}</li>
          </ul>
        </div>
        <div className={`${FooterCSS.col} ${FooterCSS.social}`}>
          <h1>{t('footer.titles.social')}</h1>
          <ul>
            <li><h6>Alberto Gómez</h6><a href="https://github.com/albertogomezz"><img src={github}width="32"/></a></li>
          </ul>
        </div>
      <div className={FooterCSS.clearfix}></div>
      </div>
      </div>
      )
}