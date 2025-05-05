SELECT 
    DATE(ad.datareceptie) AS datareceptie_day,
    ad.doc,
    ad.nrdoc,
	SUM(o.valoarevanzarefaratva) AS total_valoarevanzarefaratva
FROM accountingdocument ad
JOIN public.document d ON ad.id = d.id
JOIN operatiune o ON ad.id = o.accounting_doc_id
WHERE ad.doc = 'BON DE CASA'
  AND d.company_id = 4
  AND ad.datareceptie > '2025-03-01'
  AND EXISTS (
      SELECT 1
      FROM accountingdocument ad2
	  JOIN public.document d2 ON ad2.id = d2.id
      WHERE ad2.doc = 'BON DE CASA'
	    AND d2.company_id = 4
        AND DATE(ad2.datareceptie) = DATE(ad.datareceptie)
        AND ad2.nrdoc = ad.nrdoc
        AND ad2.id != ad.id
  )
GROUP BY DATE(ad.datareceptie), ad.doc, ad.nrdoc;
