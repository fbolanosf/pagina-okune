// Brochure PDF Download Functionality

document.addEventListener('DOMContentLoaded', () => {
    const downloadBtn = document.getElementById('downloadBrochure');

    if (downloadBtn) {
        downloadBtn.addEventListener('click', (e) => {
            e.preventDefault();

            // Show loading state
            const originalText = downloadBtn.innerHTML;
            downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Abriendo brochure...';
            downloadBtn.style.pointerEvents = 'none';

            // Open brochure in new window with instructions
            const brochureWindow = window.open('brochure.html', '_blank');

            // Add message to new window when it loads
            if (brochureWindow) {
                brochureWindow.onload = function () {
                    // Add download button to the brochure page
                    const script = brochureWindow.document.createElement('script');
                    script.innerHTML = `
                        // Add floating download button
                        const downloadBtn = document.createElement('button');
                        downloadBtn.innerHTML = '<i class="fas fa-download"></i> Descargar como PDF';
                        downloadBtn.style.cssText = \`
                            position: fixed;
                            top: 20px;
                            right: 20px;
                            z-index: 99999;
                            padding: 15px 30px;
                            background: linear-gradient(135deg, #64ffda, #ffd700);
                            border: none;
                            border-radius: 8px;
                            color: #0a192f;
                            font-weight: 700;
                            font-size: 16px;
                            cursor: pointer;
                            box-shadow: 0 5px 20px rgba(100, 255, 218, 0.4);
                            transition: all 0.3s ease;
                        \`;
                        
                        downloadBtn.onmouseover = function() {
                            this.style.transform = 'translateY(-3px)';
                            this.style.boxShadow = '0 8px 25px rgba(100, 255, 218, 0.6)';
                        };
                        
                        downloadBtn.onmouseout = function() {
                            this.style.transform = 'translateY(0)';
                            this.style.boxShadow = '0 5px 20px rgba(100, 255, 218, 0.4)';
                        };
                        
                        downloadBtn.onclick = function() {
                            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generando PDF...';
                            this.style.pointerEvents = 'none';
                            
                            const element = document.getElementById('brochure');
                            const opt = {
                                margin: 0,
                                filename: 'OKUNE_Consulting_Brochure_2025.pdf',
                                image: { type: 'jpeg', quality: 0.98 },
                                html2canvas: {
                                    scale: 2,
                                    useCORS: true,
                                    letterRendering: true,
                                    logging: false
                                },
                                jsPDF: {
                                    unit: 'mm',
                                    format: 'a4',
                                    orientation: 'portrait',
                                    compress: true
                                },
                                pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
                            };
                            
                            html2pdf().set(opt).from(element).save().then(() => {
                                this.innerHTML = '<i class="fas fa-check"></i> ¡Descargado!';
                                setTimeout(() => {
                                    this.innerHTML = '<i class="fas fa-download"></i> Descargar como PDF';
                                    this.style.pointerEvents = 'auto';
                                }, 2000);
                            }).catch(err => {
                                console.error('Error:', err);
                                this.innerHTML = '<i class="fas fa-exclamation-circle"></i> Error';
                                setTimeout(() => {
                                    this.innerHTML = '<i class="fas fa-download"></i> Descargar como PDF';
                                    this.style.pointerEvents = 'auto';
                                }, 2000);
                            });
                        };
                        
                        document.body.appendChild(downloadBtn);
                        
                        // Also add print button
                        const printBtn = document.createElement('button');
                        printBtn.innerHTML = '<i class="fas fa-print"></i> Imprimir';
                        printBtn.style.cssText = \`
                            position: fixed;
                            top: 80px;
                            right: 20px;
                            z-index: 99999;
                            padding: 12px 25px;
                            background: white;
                            border: 2px solid #64ffda;
                            border-radius: 8px;
                            color: #0a192f;
                            font-weight: 600;
                            font-size: 14px;
                            cursor: pointer;
                            box-shadow: 0 3px 15px rgba(0, 0, 0, 0.1);
                            transition: all 0.3s ease;
                        \`;
                        
                        printBtn.onclick = function() {
                            window.print();
                        };
                        
                        document.body.appendChild(printBtn);
                    `;
                    brochureWindow.document.body.appendChild(script);
                };

                // Success message
                downloadBtn.innerHTML = '<i class="fas fa-check"></i> ¡Abierto!';
                setTimeout(() => {
                    downloadBtn.innerHTML = originalText;
                    downloadBtn.style.pointerEvents = 'auto';
                }, 2000);
            } else {
                // Popup blocked
                downloadBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Pop-up bloqueado';
                alert('Por favor, permite pop-ups para descargar el brochure');
                setTimeout(() => {
                    downloadBtn.innerHTML = originalText;
                    downloadBtn.style.pointerEvents = 'auto';
                }, 2000);
            }
        });
    }
});
